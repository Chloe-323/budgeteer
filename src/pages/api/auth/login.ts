import { verify } from "@node-rs/argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import {Session, generateSessionToken, createSession, TokenData, ErrorData } from "@/lib/auth";

import pg from 'pg';
const {Client} = pg;

const client = new Client();
client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse<TokenData | ErrorData>) {
	if (req.method !== "POST") {
		res.status(404).end();
		return;
	}

	const body: null | Partial<{ email: string; password: string }> = req.body;
	console.log(`Login request received with email ${body?.email} and password ${body?.password}`);
	const email = body?.email;
	if (!email || !isValidEmail(email)) {
		res.status(400).json({
			error: "Invalid email address"
		});
		return;
	}
	const password = body?.password;
	if (!password) {
		res.status(400).json({
			error: "Invalid password"
		});
		return;
	}

	const userCheckResult = await client.query("SELECT * FROM users WHERE email = $1", [email]);
	if (!userCheckResult) {
		res.status(500).json({
			error: "An unknown error occurred"
		});
		return;
	}
	if (userCheckResult.rowCount !== 1) {
		res.status(400).json({
			error: "Incorrect email or password."
		});
		return;
	}
	const existingUser = userCheckResult.rows[0];

	const validPassword = await verify(existingUser.password, password, {
		memoryCost: 19456,
		timeCost: 32,
		outputLen: 32,
		parallelism: 1
	});
	if (!validPassword) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
		// If usernames are public, you can outright tell the user that the username is invalid.
		res.status(400).json({
			error: "Incorrect username or password"
		});
		return;
	}

	
	const token = generateSessionToken();
	const session = await createSession(token, existingUser.id);
	res.status(200).json(
		{token: token}
	);
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function isValidPasswordHash(passwordHash: string): boolean {
	return passwordHash.length === 64;
}

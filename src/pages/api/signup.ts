import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "@node-rs/argon2"; 
import {isValidEmail, isValidPasswordHash} from "./login";
import pg from 'pg';
import { ErrorData, MessageData } from "@/lib/auth";
const {Client} = pg;

const client = new Client();
client.connect();


export default async function handler(req: NextApiRequest, res: NextApiResponse<MessageData | ErrorData>) {
	if (req.method !== "POST") {
		res.status(404).end();
		return;
	}

	const body: null | Partial<{ name: string; email: string; password: string }> = req.body;
	const name = body?.name;
	if(!name) {
		res.status(400).json({
			error: "Invalid name"
		});
		return;
	}

	const email = body?.email;
	if (!email || !isValidEmail(email)) {
		res.status(400).json({
			error: "Invalid email address"
		});
		return;
	}
	const password = body?.password;
	if (!password || !isValidPasswordHash(password)) {
		res.status(400).json({
			error: "Invalid password"
		});
		return;
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 32,
		outputLen: 32,
		parallelism: 1
	});

	const queryResult = await client.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT(email) DO NOTHING RETURNING id", [name, email, passwordHash]);
	if (!queryResult) {
		res.status(500).json({
			error: "An unknown error occurred"
		});
		return;
	}

	if (queryResult.rowCount === 0) {
		res.status(400).json({
			error: "User with this email already exists"
		});
		return;
	}

	res.status(200).json({
		message: "User created successfully"
	});
}
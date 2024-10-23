
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import type { IncomingMessage, ServerResponse } from "http";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

import pg from 'pg';
const {Client} = pg;


const client = new Client();
client.connect();

const hourInMilis = 1000 * 60 * 60;
const sessionDuration = hourInMilis * 6;

export type ErrorData = {
	error: string
}

export type MessageData = {
	message: string
}

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: number): Promise<SessionCreationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + sessionDuration)
	};
	await client.query(
		"INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)",
		[
			session.id,
			session.userId,
			session.expiresAt
		]
	);
	return {
		session: session, 
		userKey: encodeHexLowerCase(sha256(new TextEncoder().encode(session.userId.toString())))
	};
}

export async function validateSessionToken(token: string | undefined, userKey: string | undefined): Promise<SessionValidationResult> {

	// Variables not provided
	if(token === undefined || userKey === undefined) {
		return null;
	}

	// Find session
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await client.query(
		"SELECT sessions.id, sessions.user_id, sessions.expires_at FROM sessions WHERE sessions.id = $1",
		[sessionId]
	);

	// Session not found
	if (result === null || result.rowCount === 0) {
		return null;
	}

	// Session found
	const row = result.rows[0];
	const session: Session = {
		id: row.id,
		userId: row.user_id,
		expiresAt: new Date(row[2] * 1000)
	};

	// Session expired
	if (Date.now() >= session.expiresAt.getTime()) {
		await client.query("DELETE FROM sessions WHERE id = $1", [session.id]);
		return null;
	}

	// User key mismatch
	if (userKey !== encodeHexLowerCase(sha256(new TextEncoder().encode(session.userId.toString()))) ) {
		return null;
	}

	// If session is more than halfway through its duration, extend it
	if (Date.now() >= session.expiresAt.getTime() - sessionDuration / 2) {
		session.expiresAt = new Date(Date.now() + sessionDuration);
		await client.query(
			"UPDATE sessions SET expires_at = $1 WHERE id = $2",
			[
				Math.floor(session.expiresAt.getTime() / 1000),
				session.id
			]
		);
	}

	return session;
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await client.query("DELETE FROM sessions WHERE id = $1", [sessionId]);
}

export type SessionValidationResult =
	| Session
	| null
;

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

export interface SessionCreationResult {
	session: Session;
	userKey: string;
}

export interface User {
	id: number;
}
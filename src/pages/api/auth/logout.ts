import { invalidateSession, validateSessionToken } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

import pg from 'pg';
const {Client} = pg;


const database = new Client();
database.connect();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.status(404).end();
		return;
	}

	const session = await validateSessionToken(req.cookies.token, req.cookies.userKey);

	if (!session) {
		res.status(401).end();
		return;
	}

	invalidateSession(session.id);
	res.setHeader('Set-Cookie', [
        'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT', 
        'userKey=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        'name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    ]);
    res.status(200).end();
}
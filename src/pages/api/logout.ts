import type { NextApiRequest, NextApiResponse } from "next";

import pg from 'pg';
const {Client} = pg;


const client = new Client();
client.connect();


/*
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.status(404).end();
		return;
	}
	const { session } = await validateRequest(req, res);
	if (!session) {
		res.status(401).end();
		return;
	}
	await lucia.invalidateSession(session.id);
	res.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize()).status(200).end();
}
	*/
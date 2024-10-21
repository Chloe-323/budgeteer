import type { NextApiRequest, NextApiResponse } from "next";
import { validateSessionToken, SessionValidationResult } from "@/lib/auth";
import { IBudgetMetadata } from "../components/budget";

import pg from 'pg';
const {Client} = pg;

const database = new Client();
database.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse<IBudgetMetadata[]>) {
    if(req.method !== "POST") {
        res.status(404).end();
        return;
    }

    if(req.cookies.token === undefined) {
        res.status(401).end();
        return;
    }

    const session = await validateSessionToken(req.cookies.token);

    if(session === null) {
        res.status(401).end();
        return;
    }

    const userId = session.userId;

    const queryResult = await database.query("SELECT id, name, start_date, end_date FROM budgets WHERE user_id = $1", [userId]);

    if(!queryResult) {
        res.status(500).end();
        return;
    }

    res.status(200).json(queryResult.rows.map((row) => ({id: row.id, name: row.name, startDate: row.start_date, endDate: row.end_date})));
}
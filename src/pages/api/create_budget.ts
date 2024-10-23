import type { NextApiRequest, NextApiResponse } from "next";
import { validateSessionToken, SessionValidationResult, ErrorData } from "@/lib/auth";
import { IBudgetMetadata } from "../components/budget";

import pg from 'pg';
const {Client} = pg;

const database = new Client();
database.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse<ErrorData | IBudgetMetadata>) {
    if(req.method !== "POST") {
        res.status(404).end();
        return;
    }

    const session = await validateSessionToken(req.cookies.token, req.cookies.userKey);

    if(!session) {
        res.status(401).end();
        return;
    }

    const body: null | Partial<{ name: string; startDate: string; endDate: string; }> = req.body;

    const name = body?.name;
    const startDate = body?.startDate;
    const endDate = body?.endDate;

    if(!name) {
        res.status(400).json({
            error: "Invalid name"
        });
        return;
    }

    if(!startDate || Number.isNaN(Date.parse(startDate))) {
        res.status(400).json({
            error: "Invalid start date"
        });
        return;
    }

    if(!endDate || Number.isNaN(Date.parse(endDate))) {
        res.status(400).json({
            error: "Invalid end date"
        });
        return;
    }

    const queryResult = await database.query("INSERT INTO budgets (name, start_date, end_date, user_id) VALUES ($1, $2, $3, $4) RETURNING id", [name, startDate, endDate, session.userId]);

    if(!queryResult || queryResult.rowCount === 0) {
        res.status(500).end();
        return;
    }

    res.status(200).json({
        id: queryResult.rows[0].id,
        name,
        startDate,
        endDate
    });
}
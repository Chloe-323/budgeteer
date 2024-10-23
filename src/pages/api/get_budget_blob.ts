import type { NextApiRequest, NextApiResponse } from "next";
import { validateSessionToken, SessionValidationResult } from "@/lib/auth";
import { IBudgetMetadata } from "../components/budget";

import pg from 'pg';
const {Client} = pg;

const database = new Client();
database.connect();

export interface IBudgetBlob {
    id: number;
    blob: ArrayBuffer;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IBudgetMetadata[]>) {
    if(req.method !== "POST") {
        res.status(404).end();
        return;
    }
    
    const session = await validateSessionToken(req.cookies.token, req.cookies.userKey);

    if(session === null) {
        res.status(401).end();
        return;
    }

    const body: null | Partial<{ id: number }> = req.body;

    const budgetId = body?.id;
    if(!budgetId) {
        res.status(400).end();
        return;
    }

    const queryResult = await database.query("SELECT data as blob FROM budgets WHERE id = $1", [budgetId]);

    if(!queryResult) {
        res.status(500).end();
        return;
    }

    if(queryResult.rowCount === 0) {
        res.status(404).end();
        return;
    }

    res.status(200).json(queryResult.rows[0]);
}
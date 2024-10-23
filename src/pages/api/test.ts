import { createSession, generateSessionToken, validateSessionToken } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  returnValue: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    const token = generateSessionToken();
    const session = await createSession(token, 1);
  res.status(200).json({ returnValue: "John Doe" });
}

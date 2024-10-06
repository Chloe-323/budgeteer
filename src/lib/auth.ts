import {Lucia} from "lucia";
import type { Session, User } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import type { IncomingMessage, ServerResponse } from "http";
import pg from 'pg';

const {Client} = pg;
const client = new Client();

const adapter = new NodePostgresAdapter(client, {
    user: "users",
    session: "sessions"
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
    getSessionAttributes: (attributes) => {
        return {

        }
    }
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

export async function validateRequest(
	req: IncomingMessage,
	res: ServerResponse
): Promise<{ user: User; session: Session } | { user: null; session: null }> {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
	if (!sessionId) {
		return {
			user: null,
			session: null
		};
	}
	const result = await lucia.validateSession(sessionId);
	if (result.session && result.session.fresh) {
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(result.session.id).serialize());
	}
	if (!result.session) {
		res.appendHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}
	return result;
}
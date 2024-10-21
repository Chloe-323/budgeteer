import pg from 'pg'
const {Client} = pg;

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    const client = new Client();
    client.connect();

    await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `);

    await client.query(`
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id),
        expires_at TIMESTAMPTZ NOT NULL
    ); 
    `);

    await client.query(`
      INSERT INTO users(name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING *;
    `,
    [
      'chloe', 'chloe@test.me','A Random Unhashed Password. Uh-oh'
    ]);

    await client.query(`
      CREATE TABLE IF NOT EXISTS budgets (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        data BLOB,
      );
    `);
  
  res.status(200).json({});
}

export interface IDatabaseUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

    /*

    await client.query(`
    CREATE TABLE IF NOT EXISTS auth_user (
        id TEXT PRIMARY KEY
    );
    `);

    const text = 'INSERT INTO users(name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING *;';
    const values = ['chloe', 'chloe@test.me'];
    const queryResult = await client.query(text, values)
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      image VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `
    console.log(`Created "users" table`)

    const users = await Promise.all([
      sql`
            INSERT INTO users (name, email, image)
            VALUES ('Guillermo Rauch', 'rauchg@vercel.com', 'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg')
            ON CONFLICT (email) DO NOTHING;
        `,
      sql`
            INSERT INTO users (name, email, image)
            VALUES ('Lee Robinson', 'lee@vercel.com', 'https://images.ctfassets.net/e5382hct74si/4BtM41PDNrx4z1ml643tdc/7aa88bdde8b5b7809174ea5b764c80fa/adWRdqQ6_400x400.jpg')
            ON CONFLICT (email) DO NOTHING;
        `,
      sql`
            INSERT INTO users (name, email, image)
            VALUES ('Steven Tey', 'stey@vercel.com', 'https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg')
            ON CONFLICT (email) DO NOTHING;
        `,
    ])
    console.log(`Seeded ${users.length} users`)
    */
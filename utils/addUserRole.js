import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

async function addUserRole(userId, databaseName, role) {
    const credentialsPath = path.join(__dirname, 'credentials.json');
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

    const client = new Client(credentials);

    await client.connect();

    try {
        const res = await client.query(
            'INSERT INTO roles (user_id, database_name, role) VALUES ($1, $2, $3) RETURNING *',
            [userId, databaseName, role]
        );

        if (res.rows.length === 0) {
            throw new Error('Failed to add user role.');
        }

        return res.rows[0];
    } finally {
        await client.end();
    }
}

export default addUserRole;
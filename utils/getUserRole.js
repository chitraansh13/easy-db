import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

async function getUserRole(userId, databaseName) {
    const credentialsPath = path.join(__dirname, 'credentials.json');
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

    const client = new Client(credentials);

    await client.connect();

    try {
        const res = await client.query(
            'SELECT role FROM roles WHERE user_id = $1 AND database_name = $2',
            [userId, databaseName]
        );

        if (res.rows.length === 0) {
            throw new Error('Role not found for the specified user and database.');
        }

        return res.rows[0].role;
    } finally {
        await client.end();
    }
}

export default getUserRole;
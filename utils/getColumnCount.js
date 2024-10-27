import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const credentialsPath = path.join(__dirname, 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const client = new Client(credentials);

client.connect();

export const getColumnCount = async (tableName) => {
    const query = `
        SELECT COUNT(column_name) AS column_count
        FROM information_schema.columns
        WHERE table_name = $1
    `;
    const res = await client.query(query, [tableName]);
    if (res.rows.length === 0) {
        throw new Error(`Table "${tableName}" does not exist`);
    }
    return res.rows[0].column_count;
};
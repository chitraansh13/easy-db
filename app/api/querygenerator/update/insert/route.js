import { NextResponse } from 'next/server';
import getUserRole from '../../../../../utils/getUserRole'; 

export async function POST(req) {
    try {
        const { userId, tablename, columns, values, databaseName } = await req.json();

        if (!userId || !tablename || !Array.isArray(columns) || columns.length === 0 || !Array.isArray(values) || values.length === 0 || !databaseName) {
            throw new Error('Invalid input: userId, tablename, columns, values, and databaseName are required.');
        }

        if (columns.length !== values.length) {
            throw new Error('Invalid input: columns and values length mismatch.');
        }

        const userRole = await getUserRole(userId, databaseName);

        if (userRole !== 'master' && userRole !== 'editor') {
            throw new Error('Permission denied: You do not have the required permissions to insert into the table.');
        }

        const columnNames = columns.join(', ');
        const valuePlaceholders = values.map(value => {
            if (typeof value === 'string') {
                return `'${value}'`;
            }
            return value;
        }).join(', ');

        const query = `INSERT INTO ${tablename} (${columnNames}) VALUES (${valuePlaceholders});`;

        return NextResponse.json(
            { message: 'SQL query generated successfully', query },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error generating SQL query:', error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
import { NextResponse } from 'next/server';
import isValidName from '../../../utils/validateName';

export async function POST(req) {
    try {
        const { databaseName } = await req.json();

        if (!databaseName) {
            throw new Error('Invalid input: databaseName is required.');
        }

        if (!isValidName(databaseName)) {
            throw new Error('Invalid input: databaseName contains invalid characters or special keywords.');
        }

        const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`;

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
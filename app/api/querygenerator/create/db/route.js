import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { dbname } = await req.json();

        if (!dbname) {
            throw new Error('Invalid input: dbname is required.');
        }

        const query = `CREATE DATABASE ${dbname};`;

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
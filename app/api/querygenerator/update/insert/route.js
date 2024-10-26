import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { tablename, columns, values } = await req.json();

        if (!tablename || !Array.isArray(columns) || columns.length === 0 || !Array.isArray(values) || values.length === 0) {
            throw new Error('Invalid input: tablename, columns, and values are required.');
        }

        if (columns.length !== values.length) {
            throw new Error('Invalid input: columns and values length mismatch.');
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
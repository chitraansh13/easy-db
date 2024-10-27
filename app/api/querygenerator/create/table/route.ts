// app/api/querygenerator/create/table/route.ts

import { NextResponse, NextRequest } from 'next/server';
import isValidName from '../../../../../utils/validateName';

export async function POST(req: NextRequest) {
    try {
        const { tablename, columns, databaseName } = await req.json();

        if (!tablename || !Array.isArray(columns) || columns.length === 0 || !databaseName) {
            throw new Error('Invalid input: tablename, columns, and databaseName are required.');
        }

        if (!isValidName(tablename)) {
            throw new Error('Invalid input: tablename contains invalid characters or special keywords.');
        }

        for (const column of columns) {
            if (!isValidName(column.name)) {
                throw new Error(`Invalid input: column name "${column.name}" contains invalid characters or special keywords.`);
            }
        }

        const columnDefinitions = columns.map((col) => {
            const { name, datatype, constraints } = col;

            let colDefinition = `${name} ${datatype}`;
            if (constraints) {
                if (constraints.primary_key) colDefinition += ' PRIMARY KEY';
                if (constraints.not_null) colDefinition += ' NOT NULL';
                if (constraints.unique) colDefinition += ' UNIQUE';
                if (constraints.default) colDefinition += ` DEFAULT ${constraints.default}`;
            }

            return colDefinition;
        });

        const query = `CREATE TABLE IF NOT EXISTS ${tablename} (${columnDefinitions.join(', ')});`;

        return NextResponse.json(
            { message: 'SQL query generated successfully', query },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error('Error generating SQL query:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 400 }
        );
    }
}

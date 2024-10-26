import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { tablename, columns } = await req.json();

        if (!tablename || !Array.isArray(columns) || columns.length === 0) {
            throw new Error('Invalid input: tablename and columns are required.');
        }

        const columnDefinitions = columns.map((col) => {
            const { name, datatype, constraints } = col;

            if (!name || !datatype) {
                throw new Error('Invalid column definition: name and datatype are required.');
            }

            let colDefinition = `${name} ${datatype}`;

            if (constraints) {
                if (constraints.primary_key) {
                    colDefinition += ' PRIMARY KEY';
                }
                if (constraints.not_null) {
                    colDefinition += ' NOT NULL';
                }
                if (constraints.unique) {
                    colDefinition += ' UNIQUE';
                }
                if (constraints.default) {
                    colDefinition += ` DEFAULT ${constraints.default}`;
                }
            }

            return colDefinition;
        });

        const query = `CREATE TABLE ${tablename} (${columnDefinitions.join(', ')});`;

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
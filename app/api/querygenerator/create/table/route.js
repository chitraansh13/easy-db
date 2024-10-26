import { NextResponse } from 'next/server';
import getUserRole from '../../../../../utils/getUserRole';
import isValidName from '../../../../../utils/validateName';

export async function POST(req) {
    try {
        const { tablename, columns, databaseName } = await req.json();

        if (!tablename || !Array.isArray(columns) || columns.length === 0 || !databaseName) {
            throw new Error('Invalid input: tablename, columns, and databaseName are required.');
        }

        // const userRole = await getUserRole(userId, databaseName);

        // if (userRole !== 'master' && userRole !== 'editor') {
        //     throw new Error('Permission denied: You do not have the required permissions to create a table.');
        // }

        if (!isValidName(tablename)) {
            throw new Error('Invalid input: tablename contains invalid characters or special keywords.');
        }

        for (const column of columns) {
            if (!isValidName(column.name)) {
                throw new Error(`Invalid input: column name "${column.name}" contains invalid characters or special keywords.`);
            }
        }

        // Hardcoded auto-increment column without primary key
        const autoIncrementColumn = 'SerialNo SERIAL';

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

        // Add the auto-increment column as the first column
        columnDefinitions.unshift(autoIncrementColumn);

        const query = `CREATE TABLE IF NOT EXISTS ${tablename} (${columnDefinitions.join(', ')});`;

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
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { tablename, conditions } = await req.json();

        if (!tablename) {
            throw new Error('Invalid input: tablename is required.');
        }

        let query = `DELETE FROM ${tablename}`;

        if (conditions) {
            const { where, orderBy, limit } = conditions;

            if (where && Array.isArray(where) && where.length > 0) {
                const whereClauses = where.map(condition => {
                    const { column, operator, value } = condition;
                    if (!column || !operator || value === undefined) {
                        throw new Error('Invalid where condition: column, operator, and value are required.');
                    }
                    return `${column} ${operator} '${value}'`;
                });
                query += ` WHERE ${whereClauses.join(' AND ')}`;
            }

            if (orderBy && Array.isArray(orderBy) && orderBy.length > 0) {
                const orderByClauses = orderBy.map(order => {
                    const { column, direction } = order;
                    if (!column || !direction) {
                        throw new Error('Invalid order by condition: column and direction are required.');
                    }
                    return `${column} ${direction}`;
                });
                query += ` ORDER BY ${orderByClauses.join(', ')}`;
            }

            if (limit !== undefined) {
                query += ` LIMIT ${limit}`;
            }
        }

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
import { Pool, PoolConfig } from 'pg';

// Configuration for the main database connection
const mainConfig: PoolConfig = {
  user: "postgres",
  host: "localhost",
  database: "easy-db", // main database name
  password: "password",
  port: 5432,
};

// Configuration for the admin connection (default 'postgres' database)
const adminConfig: PoolConfig = {
  user: "postgres",
  host: "localhost",
  database: "postgres", // default PostgreSQL database for admin operations
  password: "password",
  port: 5432,
};

// Initialize pools
const mainPool = new Pool(mainConfig);
const adminPool = new Pool(adminConfig);

// Function to create a new pool for a specified database
const createDbPool = (dbName: string) => {
    return new Pool({
        user: "postgres",
        host: "localhost",
        database: dbName, // Use the specified database name
        password: "password",
        port: 5432,
    });
};

export { mainPool, adminPool, createDbPool };

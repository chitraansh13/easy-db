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

export { mainPool, adminPool };
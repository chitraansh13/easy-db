import { Pool } from 'pg';
import { PoolConfig } from 'pg';

const config: PoolConfig = {
  user: "postgres",
  host: "localhost",
  database: "easy-db",
  password: "password",
  port: 5432,
};

const pool = new Pool(config);

export default pool;
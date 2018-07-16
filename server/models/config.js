import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const config = {
  user: 'postgres',
  database: 'postgres',
  password: 'null',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000,
};
// const connectionString = process.env.DB_URL;
const dbConnection = new pg.Pool(config);

export default dbConnection;

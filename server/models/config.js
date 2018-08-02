import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;

let ssl;

const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_URL, NODE_ENV, TEST_DB} = process.env;

const config = {
  user: DB_USERNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: 10,
  idleTimeoutMillis: 3000,
};

if (NODE_ENV === 'test') {
	connectionString = TEST_DB;
	ssl = false;
} else if (NODE_ENV === 'production'){
	connectionString =  process.env.DATABASE_URL;
	ssl = true;
} else {
	connectionString = config;
}
// const connectionString = DB_URL;
// const dbConnection = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: true });
const dbConnection = new pg.Pool({ connectionString, ssl});

export default dbConnection;

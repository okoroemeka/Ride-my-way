import pg from 'pg';

const config = {
  user: 'USRE',
  database: 'ridemyway',
  password: 'null',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000,
};

const databaseConnection = new pg.Pool(config);

export default databaseConnection;

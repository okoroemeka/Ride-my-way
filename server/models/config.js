import pg from 'pg';

const config = {
  user: 'postgres',
  database: 'postgres',
  password: 'null',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000,
};

const databaseConnection = new pg.Pool(config);

export default databaseConnection;

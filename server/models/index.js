import {pg} from 'pg';

const config = {
   user:'postgres',
   database:'Ride-my-way' ,
   password:'andela',
   port: 5432,
   max: 10,
   idleTimeoutMillis:3000,
}

const pool = new pg.pool(config);

export default pool;

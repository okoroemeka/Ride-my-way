import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes/route';

// import seed data
import store from './server/seedData/seed';

// Initialise express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use((req, res, next) => {
  req.store = store;
  next();
});

// Router
routes(app);

// Export app
export default app;

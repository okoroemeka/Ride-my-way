import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes/route';


// Initialise express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Router
routes(app);

// Export app
export default app;

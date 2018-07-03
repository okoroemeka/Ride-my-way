import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/route';

// Initialise express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Router
routes(app);

const port = parseInt(process.env.PORT, 10) || 8000;
http.createServer(app);
app.listen(port, () => console.log(`listening on ${port}`));
// Export app
export default app;

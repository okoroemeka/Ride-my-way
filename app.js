import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the begining of nothingness',
}));

export default app;

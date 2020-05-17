import * as express from 'express';
import * as bodyParser from 'body-parser';
import { errors } from 'celebrate';
import apiErrorHandler from 'api-error-handler';
import * as path from "path";

const app = express();
app.use(bodyParser.json());

app.use(errors());
// should be after joi, they also throw exceptions

// const isStackShown = process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production';
// // app.use(apiErrorHandler({ isStackShown }));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../pages/index.html')));

export default app;

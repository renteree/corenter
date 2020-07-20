import express from 'express';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import path from 'path';
import tenantRoutes from './tenant/tenanRoutes';

const app = express();
app.use(bodyParser.json());

app.use(errors());
tenantRoutes(app);

// const isStackShown = process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production';
// // app.use(apiErrorHandler({ isStackShown }));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../pages/index.html')));

export default app;

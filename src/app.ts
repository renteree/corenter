import express from 'express';
import bodyParser from 'body-parser';
import { errors as joiErrors } from 'celebrate';
import tenantRoutes from './tenant/tenantRoutes';

const app = express();
app.use(bodyParser.json());

tenantRoutes(app);
app.get('/', (req, res) => res.send('Hello world'));

app.use(joiErrors());

export default app;

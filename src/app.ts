import express from 'express';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { errors as joiErrors } from 'celebrate';
import tenantRoutes from './tenant/tenanRoutes';

const app = express();
app.use(bodyParser.json());

app.use(errors());
tenantRoutes(app);
app.get('/', (req, res) => res.send('Hello world'));

app.use(joiErrors());

export default app;

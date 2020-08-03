import express from 'express';
import bodyParser from 'body-parser';
import { errors as joiErrors } from 'celebrate';
import { initDB } from './common/db';
import tenantRoutes from './routes/tenantRoutes';

initDB();
const app = express();
app.use(bodyParser.json());

tenantRoutes(app);
app.get('/', (req, res) => res.send('Hello world'));

app.use(joiErrors());

export default app;

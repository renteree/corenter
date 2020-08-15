import express from 'express';
import bodyParser from 'body-parser';
import { errors as joiErrors } from 'celebrate';
import cors from 'cors';
import { initDB } from './common/db';
import tenantRoutes from './routes/tenantRoutes';
import config from './config';
import multerConfig from './common/multerConfig';

initDB();
const app = express();

const whitelist = [`${config.app.domain}`, 'http://localhost:3000'];
const options:cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: whitelist,
  preflightContinue: false,
};

app.use(cors(options));

app.use(multerConfig().single('file'));
app.use(bodyParser.json());

tenantRoutes(app);
app.get('/', (req, res) => res.send('Hello world'));

app.use(joiErrors());

export default app;

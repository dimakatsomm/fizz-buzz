import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { loadAll } from 'js-yaml';
import { JsonObject, serve, setup } from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { middleware } from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import * as C from './constants';
import usersRouter from './routes/users.route';

const app = express();

const apiSpec = readFileSync(path.join(__dirname, '../spec/api.spec.yaml'), 'utf-8');
const swaggerDoc = loadAll(apiSpec, null, { json: true })[0] as JsonObject;

app.use(express.json());
app.use('/swagger', serve, setup(swaggerDoc));
app.use(middleware({ apiSpec: swaggerDoc as OpenAPIV3.Document }));
app.use('/users', usersRouter);

app.listen(C.PORT, () => {
  console.log(`Server running on PORT: ${C.PORT}`);
});

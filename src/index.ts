import 'reflect-metadata';
import express from 'express'

import './database/connect'
import routes from './routes'

const app = express();

//* Habilitando o body-parser
app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('🚀 Server started 🚀 '));
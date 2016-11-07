import http from 'http';
import express from 'express';
import Promise from 'bluebird';
import cors from 'cors';

import {
  HOSTNAME,
  PORT
} from '../../config/environment';

export const app = express();

app.use(cors());

export const server = http.createServer(app);

export const listen = new Promise((resolve, reject) => server.listen(PORT, HOSTNAME, err => err ? reject(err) : resolve()));

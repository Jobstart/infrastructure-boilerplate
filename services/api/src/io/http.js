import http from 'http';
import express from 'express';
import Promise from 'bluebird';
import cors from 'cors';

export const app = express();

app.use(cors());

export const server = http.createServer(app);

export const listen = new Promise((resolve, reject) => server.listen(__PORT__, __HOSTNAME__, err => err ? reject(err) : resolve()));

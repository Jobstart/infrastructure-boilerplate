import express from 'express';
import Promise from 'bluebird';
import cors from 'cors';

export const http = express();

http.use(cors());

export const listen = new Promise((resolve, reject) => http.listen(__PORT__, __HOSTNAME__, err => err ? reject(err) : resolve()));

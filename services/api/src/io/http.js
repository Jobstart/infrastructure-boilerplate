import express from 'express';
import Promise from 'bluebird';

export const http = express();

export const listen = new Promise((resolve, reject) => http.listen(__PORT__, __HOSTNAME__, err => err ? reject(err) : resolve()));

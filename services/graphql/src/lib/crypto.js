import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';

import {
  JWT_SECRET
} from '../../config/environment';

export const makeSaltedHash = (input) => new Promise((resolve, reject) => (
  bcrypt.genSalt(10, (err, salt) => err ? reject(err) : resolve(salt))
)).then(salt => new Promise((resolve, reject) => (
  bcrypt.hash(input, salt, (err, hash) => err ? reject(err) : resolve(hash))
)));

export const compareSaltedHash = (input, hash) => new Promise((resolve, reject) => (
  bcrypt.compare(input, hash, (err, res) => err ? reject(err) : res ? resolve(true) : resolve(false))
));

export const objectToToken = (obj = {}) => new Promise((resolve, reject) => (
  jwt.sign(obj, JWT_SECRET, {}, (err, token) => err ? reject(err) : resolve(token))
));

export const tokenToObject = (token) => new Promise((resolve, reject) => (
  jwt.verify(token, JWT_SECRET, (err, obj) => err ? reject(err) : resolve(token))
));

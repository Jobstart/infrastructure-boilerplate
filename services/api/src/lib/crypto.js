import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';

export const makeSaltedHash = (input) => new Promise((resolve, reject) => (
  bcrypt.genSalt(10, (err, salt) => err ? reject(err) : resolve(salt))
)).then(salt => new Promise((resolve, reject) => (
  bcrypt.hash(input, salt, (err, hash) => err ? reject(err) : resolve(hash))
)));

export const compareSaltedHash = (input, hash) => new Promise((resolve, reject) => (
  bcrypt.compare(input, hash, (err, res) => err ? reject(err) : res ? resolve(true) : resolve(false))
));

export const objectToToken = (obj = {}) => new Promise((resolve, reject) => (
  jwt.sign(obj, __JWT_SECRET__, {}, (err, token) => err ? reject(err) : resolve(token))
));

export const tokenToObject = (token) => new Promise((resolve, reject) => (
  jwt.verify(token, __JWT_SECRET__, (err, obj) => err ? reject(err) : resolve(token))
));

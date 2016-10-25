import { Router } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Z_BEST_COMPRESSION } from 'zlib';
import { graphiqlExpress } from 'graphql-server-express';

import { authMiddleware, gqlMiddleware } from 'middleware';
import { logger } from 'io'

const router = Router();

if (__PRODUCTION__) {
  router.use('/*', compression({
    level: Z_BEST_COMPRESSION
  }));
}

router.use((req, res, next) => {
  logger.log('incoming request', req.url);
  next();
});

router.use('/graphql',
  cookieParser(),
  authMiddleware,
  bodyParser.json(),
  gqlMiddleware
);

router.use((err, req, res, next) => {
  logger.trace(err);
  return res.status(500).send({
    error: 'unknown',
    message: 'An unknown error has occured'
  });
});

if (__DEV__) {
  logger.log('GraphiQL UI enabled');
  router.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
}

export default router;

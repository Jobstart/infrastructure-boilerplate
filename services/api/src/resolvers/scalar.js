import mongoose from 'mongoose';
import { isMongoId, isEmail, isISO8601 } from 'validator'

import { GraphQLError } from 'graphql/error';

const Date = {
  __parseValue(value) {
    return new Date(value);
  },
  __serialize(value) {
    return value.toISOString();
  },
  __parseLiteral(ast) {
    if (!isISO8601(ast.value)) {
      throw new GraphQLError(`Query error: expected valid ISO 8601 date`, [ast])
    }
    return ast.value;
  }
};

const Null = {
  __parseValue(value) {
    return null;
  },
  __serialize(value) {
    return null;
  },
  __parseLiteral(ast) {
    if (ast.value !== null) {
      throw new GraphQLError('Query error: expected null', [ast])
    }
    return null;
  }
}

const ObjectId = {
  __parseValue(value) {
    return mongoose.Types.ObjectId(value);
  },
  __serialize(value) {
    return value.toString();
  },
  __parseLiteral(ast) {
    if (!isMongoId(ast.value)) {
      throw new GraphQLError('Query error: expected valid ObjectId', [ast])
    }
    return ast.value;
  }
};

const Email = {
  __parseValue(value) {
    return value;
  },
  __serialize(value) {
    return value;
  },
  __parseLiteral(ast) {
    if (!isEmail(ast.value)) {
      throw new GraphQLError('Query error: expected valid email address', [ast])
    }
    return ast.value;
  }
}

export default {
  Date,
  Null,
  ObjectId,
  Email
}

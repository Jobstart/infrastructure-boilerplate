import _ from 'underscore';

const createResolver = (resFn, errFn) => {
  const baseResolver = async (root, args = {}, context = {}) => {
    try {
      if (!_.isFunction(resFn)) return null;
      return await resFn(root, args, context);
    } catch (err) {
      if (!_.isFunction(errFn)) throw err;
      const parsedError = await errFn(root, args, context, err)
      throw parsedError || err;
    }
  };

  baseResolver.createResolver = (cResFn, cErrFn) => createResolver(
    async (root, args, context) => {
      const r = _.isFunction(resFn) ? await resFn(root, args, context) : null;
      if (r) return r;
      return _.isFunction(cResFn) ? await cResFn(root, args, context) : null;
    },
    async (root, args, context, err) => {
      const r = _.isFunction(errFn) ? await errFn(root, args, context, err) : null;
      if (r) throw r;
      const cR = _.isFunction(cErrFn) ? await cErrFn(root, args, context, err) : null;
      throw cR || err;
    }
  );

  return baseResolver;
};

export default createResolver;

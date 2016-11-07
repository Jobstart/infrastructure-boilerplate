import SequelizeLoader from 'adapters/sequelize/loader';

export default class SequelizeConnector {
  constructor (model, reqUser) {
    this.model = model;
    this.loader = new SequelizeLoader(model);
    this.reqUser = reqUser;
  }
  getByID (id) {
    return this.loader.load(id);
  }
  getManyByID (ids) {
    return this.loader.loadMany(ids);
  }
  async create (data = {}, transaction) {
    const instance = await this.model.create(data, {
      transaction,
      benchmark: __NODE_ENV__ === 'development'
    });
    await this.loader.prime(instance);
    return instance;
  }
  async updateByID (id, data = {}, transaction) {
    const instance = await this.model.update(data, {
      where: {
        id
      },
      returning: true,
      transaction,
      benchmark: __NODE_ENV__ === 'development'
    });
    await this.loader.replace(instance);
    return instance;
  }
  async destroyByID (id, transaction) {
    const instance = await this.model.update({
      destroyed: true
    }, {
      where: {
        id
      },
      returning: true,
      transaction,
      benchmark: __NODE_ENV__ === 'development'
    });
    await this.loader.clear(instance);
    return instance;
  }
}

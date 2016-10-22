import { MongooseLoader } from 'adapters/mongoose';

export default class MongooseConnector {
  constructor (model, reqUser) {
    this.model = model;
    this.loader = new MongooseLoader(model);
    this.reqUser = reqUser;
  }
  getByID (_id) {
    return this.loader.load(_id);
  }
  getManyByID (_ids) {
    return this.loader.loadMany(_ids);
  }
  async create (data = {}) {
    const instance = await this.model.create(data);
    this.loader.prime(instance._id.toString(), instance);
    return instance;
  }
  async updateByID (_id, data) {
    const instance = await this.model.findOneAndUpdate({
      _id
    }, {
      $set: {
        ...data,
        time_updated: Date.now()
      }
    }, {
      new: true
    });
    this.loader.replace(instance);
    return instance;
  }
  async destroyByID (_id) {
    const instance = await this.model.findOneAndUpdate({
      _id
    }, {
      $set: {
        destroyed: true,
        time_destroyed: Date.now()
      }
    }, {
      new: true
    });
    this.loader.clear(instance);
    return instance;
  }
}

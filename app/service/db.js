const Service = require('egg').Service;
class DB extends Service {
  get LIMIT() {
    return 200;
  }


  async getAllData(modelName, page) {
    const model = this.ctx.model[modelName];
    let allData = await model.find({}).limit(this.LIMIT).skip(page * this.LIMIT);
    if (allData && allData.length > 0) {
      const preData = await this.getAllData(modelName, ++page);
      allData = allData.concat(preData);
    }
    return allData;
  }
}

module.exports = DB;

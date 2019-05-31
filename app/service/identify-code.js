const Service = require('egg').Service;
class IdentifyCode extends Service {

  async findLatest(count = 30) {
    return await this.ctx.model.IdentifyCode.find({}).skip(0).limit(count).sort({
      createdAt: 'desc'
    });
  }

  async generate(phone) {

    if (!phone) {
      return { success: false, message: 'lack of params.' };
    }

    const now = Date.now() + '';
    const code = now.substr(-6);

    const cRes = await this.ctx.model.IdentifyCode.create({ code, phone });
    if (!cRes || !cRes._id) {
      return { success: false, message: 'create identify code error' };
    }

    return { success: true, message: 'success', data: { code: cRes.code } };
  }

  async check(phone, code) {

    if (!phone) {
      return { success: false, message: 'lack of params.' };
    }

    const res = await this.ctx.model.IdentifyCode.find({ code, phone, createdAt: { $gt: Date.now() - 600000 } }); // 1000 * 60 * 10
    if (!res || res.length === 0) {
      return { success: false, message: 'cehck identify code error' };
    }

    return { success: true, message: 'success' };
  }
}

module.exports = IdentifyCode;
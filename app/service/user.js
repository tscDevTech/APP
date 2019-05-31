const Service = require('egg').Service;

class User extends Service {
  get LIMIT() {
    return 200;
  }

  async findOne(user) {
    return await this.ctx.model.User.findOne(user);
  }

  async count(user = {}) {
    return await this.ctx.model.User.count(user)
  }

  async create(user) {
    const utilService = this.ctx.service.common.util;

    const newUser = Object.assign({}, user, {
      uid: utilService.createUuid(),
    });

    const cRes = await this.ctx.model.User.create(newUser);
    if (!cRes || !cRes._id) {
      return { success: false, message: 'create user error' };
    }

    return {
      success: true,
      message: 'success',
    };
  }
}

module.exports = User;

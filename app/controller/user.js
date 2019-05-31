const md5 = require('md5');
const BigNumber = require('bignumber.js');

const { Controller } = require('egg');

class UserController extends Controller {
  async register() {
    const userService = this.ctx.service.user;
    const cookieService = this.ctx.service.common.cookie;

    const {
      phone = '',
      email = '',
      password,
      identify_code: identifyCode,
    } = this.ctx.request.body;

    const existUser = await userService.findOne({ phone: phone.trim() });
    if (existUser) {
      return this.ctx.done({
        status: 403,
        message: 'error'
      });
    }

    const createRes = await userService.create({
      email,
      phone,
      password,
    });
    if (!createRes.success) {
      if (createRes.code) {
        return this.ctx.done({
          status: 403,
          message: createRes.message
        });
      }
      return this.ctx.done({
        status: 500,
        message: `register fail: message=${createRes.message}`
      });
    }

    cookieService.setLoginCookie(createRes.uid);
    return this.ctx.done(null);
  }

  async login() {
    const userService = this.ctx.service.user;
    const cookieService = this.ctx.service.common.cookie;

    const {
      email,
      phone,
      password
    } = this.ctx.request.body;



    let userSignInfo = phone
    if (!userSignInfo || !password) {
      return this.ctx.done({
        status: 500,
        message: 'login info not exist.'
      });
    }

    let user
    user = await userService.findOne({
      phone: phone.trim(),
      password: md5(password.trim())
    });

    cookieService.setLoginCookie(user.uid);

    return this.ctx.done(null);
  }

  logout() {
    this.ctx.service.common.cookie.clearLoginCookie();
    this.ctx.redirect('/');
  }
}

module.exports = UserController;

const Service = require('egg').Service;
class Cookie extends Service {
  get TOKEN() {
    return 'ctoken';
  }

  get PHONE() {
    return 'phone';
  }

  get baseCookiesOptions() {
    return {
      httpOnly: true,
      signed: true,
    };
  }

  getLoginCookie() {
    return this.ctx.cookies.get(this.TOKEN, this.baseCookiesOptions);
  }

  setLoginCookie(uid) {
    const expiredAt = Date.now() + 3600000 * 2;
    const userInfo = {
      uid,
      expiredAt,
    };

    this.ctx.cookies.set(this.TOKEN, this.encode(userInfo), this.baseCookiesOptions);
  }

  setPhoneCookie(phone) {
    this.ctx.cookies.set(this.PHONE, phone, {
      httpOnly: false,
      signed: false,
    });
  }

  clearLoginCookie() {
    const expires = new Date(1970, 1, 1);
    const baseCookiesOptions = this.baseCookiesOptions;
    const cookiesConfig = Object.assign({}, baseCookiesOptions, { expires });
    this.ctx.cookies.set(this.TOKEN, '', cookiesConfig);
    this.ctx.cookies.set(this.PHONE, '', cookiesConfig);
  }
};

module.exports = Cookie;


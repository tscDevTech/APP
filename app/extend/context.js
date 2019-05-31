'use strict';
module.exports = {
  pass(data) {
    this.body = data;
    return this.body;
  },
  done(err = null, data = {}) {
    const body = {
      status: 200,
      message: 'OK',
    };

    if (err) {
      const e = this.capture(err);
      Object.assign(body, {
        status: e.err_code,
        message: e.err_msg,
      });
    } else {
      Object.assign(body, { data });
    }

    this.body = body;
  },

  capture(err) {
    if (err && err.err_code !== undefined) {
      return err;
    }

    const body = {};

    if (err) {
      Object.assign(body, {
        err_code: err.statusCode || err.err_code || err.status || 500,
        err_msg: err.message || err.err_msg || '-',
      });
    }

    return body;
  },
};

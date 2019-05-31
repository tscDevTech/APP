'use strict';

const lodash = require('lodash');

module.exports = {
  async fetch(oUrl, options = {}) {
    const defaultOptions = {
      dataType: 'json',
      contentType: 'json',
      timeout: 60000,
      method: 'GET',
    };

    const url = this.packUrlQuery(oUrl, options.query);
    const mergeOptions = Object.assign({}, defaultOptions, options);

    const ret = await this.curl(url, mergeOptions);
    return ret.data;
  },

  /*
   * 拼接url参数
   */
  packUrlQuery(url, query = {}) {
    const p = Object.keys(query)
      .filter(key => query[key] !== undefined)
      .map(key => {
        let value = query[key];
        if (lodash.isArray(value)) {
          value = value.join(',');
        }

        return `${key}=${value}`;
      })
      .join('&');
    return url + (url.indexOf('?') > -1 ? '&' : '?') + p;
  },
};

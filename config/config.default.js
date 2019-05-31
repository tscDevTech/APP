module.exports = appInfo => ({
  logger: {
    level: 'DEBUG',
    consoleLevel: 'ERROR'
  },
  middleware: [],
  notfound: {
    pageUrl: '/',
  },
  static: {
    maxAge: 31536000,
    gzip: true,
  },
  assets: {
    publicPath: '/dist/',
  },
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  }
});

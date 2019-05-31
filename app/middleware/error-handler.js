module.exports = (opts, app) => {
  return async function errorHandleMiddleware(ctx, next) {
    try {
      await next();
    } catch (e) {
      app.logger.error(e);
      return ctx.done({
        status: 500,
        message: `exception = ${e}`
      });
    }
  };
};

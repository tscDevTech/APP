'use strict';

module.exports = app => {
  const { router, controller } = app;
  const {
    home,
  } = controller;

  router.get('/', home.index);

  router.post('/api/user/register', user.register);
  router.post('/api/user/login', user.login);
  router.get('/api/user/logout', user.logout);
};

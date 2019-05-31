module.exports = app => {
  return {
    uid: {
      type: String,
      index: true
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
  }
}

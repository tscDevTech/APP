module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema(require('./user-model')(app), { timestamps: true });
  return app.mongooseDB.get('db1').model('User', UserSchema);
}

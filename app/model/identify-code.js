const identifyCodeModel = require('./identify-code-model');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const IdentifyCodeSchema = new Schema(identifyCodeModel, { timestamps: true });
  return app.mongooseDB.get('db1').model('IdentifyCode', IdentifyCodeSchema);
}

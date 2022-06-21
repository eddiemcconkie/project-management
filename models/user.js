const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, required: true}
    email: {type: String, required: true}
  })
  
  module.exports = model('User', UserSchema)
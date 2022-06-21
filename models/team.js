const { Schema, model } = require('mongoose')

const TeamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      default: [],
    },
  ],
})

module.exports = model('Team', TeamSchema)

const { Schema, model } = require('mongoose')

const TeamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      default: [],
    },
  ],
})

module.exports = model('Team', TeamSchema)

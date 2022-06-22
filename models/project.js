const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  createdAt: { type: Date, default: Date.now },
})

module.exports = model('Project', ProjectSchema)

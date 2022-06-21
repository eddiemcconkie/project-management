const { Schema, model } = require('mongoose')

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
})

module.exports = model('Task', TaskSchema)

const { formatId } = require('../lib/helpers')
const Task = require('../models/task')
const Project = require('../models/project')

exports.retrieveTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).lean()
    // console.log(task)
    return res.status(200).json(task)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.updateTask = async (req, res) => {
  const { taskId } = req.params

  if (!req.body?.completed) {
    return res.status(400).json({
      message:
        'Invalid Project format. Please provide a title, a description, and a due date.',
    })
  }

  try {
    const task = await Task.findByIdAndUpdate(taskId, {
      $set: {
        completed: req.body.completed,
      },
    }).lean()

    // return res.status(204).json({
    //   message: 'Task Updated Successfully',
    //   task: formatId(task),
    // })
    return res.status(204).json(formatId(task))
  } catch (err) {
    return res.status(500).json({ message: 'Could not update the task' })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId

    // Remove the task from its project
    await Project.findOneAndUpdate(
      { tasks: { $elemMatch: { $eq: taskId } } },
      { $pull: { tasks: taskId } }
    )

    // Delete the task
    await Task.findByIdAndDelete(taskId)
    return res.status(204).json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Could not delete task' })
  }
}

const Task = require('../models/task')

exports.retrieveTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
    // console.log(task)
    res.status(200).send(task)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateTask = async (req, res) => {
  Task.findByIdAndUpdate(
    req.params.taskId,
    req.body,
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(result)
    }
  )
}

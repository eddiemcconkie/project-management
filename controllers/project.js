const { formatId } = require('../lib/helpers')
const Project = require('../models/project')
const Task = require('../models/task')

exports.retrieveAll = async (req, res) => {
  try {
    const user = await getUser(req)

    const teams = await Team.find({
      members: { $elemMatch: { $eq: user._id } },
    }).populate('projects')
    return res.status(200).json(teams.map((team) => team.projects).flat())
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.retrieveOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).lean()
    // console.log(project)
    return res.status(200).json(project)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.updateProject = async (req, res) => {
  const { projectId } = req.params

  if (!req.body?.title || !req.body?.description) {
    return res.status(401).json({
      message:
        'Invalid Project format. Please provide a title and description.',
    })
  }

  try {
    const project = await Project.findByIdAndUpdate(projectId, {
      title: req.body.title,
      description: req.body.description,
    }).lean()

    return res.status(204).json({
      message: 'Project Updated Successfully',
      project: formatId(project.toObject()),
    })
  } catch (err) {
    return res.status(500).json({ message: 'Could not update the project' })
  }
}

exports.getProjectTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate('tasks')
      .lean()
    return res.status(200).json(project.tasks)
  } catch (err) {
    return res.status(500).json(err)
  }
}

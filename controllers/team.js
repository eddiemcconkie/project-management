const Team = require('../models/team')
const Project = require('../models/project')
const { getIdFromEmail, formatId, getUser } = require('../lib/helpers')

/** @typedef {import('express').RequestHandler} RequestHandler */

/** @type {RequestHandler} */
exports.retrieveAll = async (req, res) => {
  try {
    const user = await getUser(req)

    const teams = await Team.find({
      members: { $elemMatch: { $eq: user._id } },
    })
    return res.status(200).json(teams)
  } catch (err) {
    return res.status(500).json(err)
  }
}

/** @type {RequestHandler} */
exports.retrieveOne = async (req, res) => {
  console.log(req.params.teamId)
  try {
    const team = await Team.findById(req.params.teamId).lean()
    return res.status(200).json(team)
  } catch (err) {
    return res.status(500).json(err)
  }
}

/** @type {RequestHandler} */
exports.updateTeam = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(422).json({ message: 'Missing Email' })
  }

  const userId = await getIdFromEmail(req.body.email).lean()
  if (!userId) {
    return res.status(400).json()
  }

  Team.findByIdAndUpdate(
    req.params.teamId,
    { $push: { members: userId } },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(result)
    }
  )
}

/** @type {RequestHandler} */
exports.addProjectToTeam = async (req, res) => {
  const { teamId } = req.params

  // Validate the project data
  if (!req.body?.title || !req.body?.description) {
    return res.status(401).json({
      message: 'Invalid Project format. Please provide a title and description',
    })
  }

  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
    })

    // If the project was created successfully, add the project ID to the team
    await Team.findByIdAndUpdate(teamId, {
      $push: { projects: project._id },
    })
    return res.status(201).json({
      message: 'Project added!',
      project: formatId(project.toObject()),
    })
  } catch (error) {
    return res.status(500).json({ message: 'Could not add project to team' })
  }
}

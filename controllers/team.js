const Team = require('../models/team')
const Project = require('../models/project')
const { getIdFromEmail, getUser } = require('../lib/helpers')

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
  try {
    const team = await Team.findById(req.params.teamId)
    return res.status(200).json(team.toObject())
  } catch (err) {
    return res.status(500).json(err)
  }
}

/** @type {RequestHandler} */
exports.updateTeam = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Missing Email' })
    }

    const userId = await getIdFromEmail(req.body.email)
    if (!userId) {
      return res.status(400).json()
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.teamId,
      { $push: { members: userId } },
      { new: true }
    )
    return res.status(204).json(updatedTeam)
  } catch (error) {
    return res.status(500).json({ message: 'Could not add user to team' })
  }
}

/** @type {RequestHandler} */
exports.addProjectToTeam = async (req, res) => {
  const { teamId } = req.params

  // Validate the project data
  if (!req.body?.title || !req.body?.description) {
    return res.status(400).json({
      message: 'Invalid Project format. Please provide a title and description',
    })
  }

  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
    })

    // If the project was created successfully, add the project ID to the team
    await Team.findByIdAndUpdate(teamId, { $push: { projects: project._id } })
    return res.status(201).json(project.toObject())
  } catch (error) {
    return res.status(500).json({ message: 'Could not add project to team' })
  }
}

/** @type {RequestHandler} */
exports.createTeam = async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: 'Please provide a name for the team' })
  }

  try {
    const user = await getUser(req)
    const team = await Team.create({
      name: req.body.name,
      members: [user._id],
      projects: [],
    })
    return res.status(201).json(team.toObject())
  } catch (error) {
    return res.status(500).json({ message: 'Could not create team' })
  }
}

/** @type {RequestHandler} */
exports.leaveTeam = async (req, res) => {
  try {
    const user = await getUser(req)

    // Pull the user from the team
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.teamId,
      { $pull: { members: user._id } },
      { new: true }
    ).lean()

    // If the user was the last to be removed, delete the team
    if (updatedTeam.members.length == 0) {
      await Team.findByIdAndDelete(req.params.teamId)
      return res.status(204).json({ message: 'Team deleted' })
    }

    // Otherwise, return as normal
    return res
      .status(204)
      .json({ message: 'You have been removed from the team' })
  } catch (error) {
    return res.status(500).json({ message: 'Could not remove you from team' })
  }
}

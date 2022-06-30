const Team = require('../models/team')
const Project = require('../models/project')
const { getUser, getIdFromEmail, formatId } = require('../lib/helpers')

/** @typedef {import('express').RequestHandler} RequestHandler */

/** @type {RequestHandler} */
exports.retrieveAll = async (req, res) => {
  try {
    const teams = await Team.find()
    // console.log(teams)
    return res.status(200).json(teams)
  } catch (err) {
    return res.status(500).json(err)
  }
}

/** @type {RequestHandler} */
exports.retrieveOne = async (req, res) => {
  console.log(req.params.teamId)
  try {
    const team = await Team.findById(req.params.teamId)
    // console.log(team)
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

  const userId = await getIdFromEmail(req.body.email)
  if (!userId) {
    return res.status(400).json()
  }

  Team.findByIdAndUpdate(
    req.params.teamId,
    { $push: { members: userId } },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(result)
    }
  )
}

/** @type {RequestHandler} */
exports.addProjectToTeam = async (req, res) => {
  const user = await getUser(req)
  if (!user) {
    return res.status(401).json({ message: "You're not signed in!" })
  }

  try {
    // Get the team the user wants to add the project to
    const { teamId } = req.params
    const team = await Team.findById(teamId).populate('members')

    // Make sure the user is a member of the team
    if (team.members.findIndex((u) => u.email === user.email) >= 0) {
      // Validate the project data
      if (!req.body?.title || !req.body?.description) {
        return res.status(401).json({
          message:
            'Invalid Project format. Please provide a title and description',
        })
      }

      // Create the project
      const projectBody = {
        title: req.body.title,
        description: req.body.description,
      }

      const project = new Project(projectBody)
      const saveResult = await project.save().catch(() => null)
      if (!saveResult) {
        return res
          .status(500)
          .json({ message: 'Could not add project to database' })
      }

      // If the project was created successfully, add the project ID to the team
      const updateResult = await Team.findByIdAndUpdate(teamId, {
        $push: { projects: saveResult._id },
      }).catch(() => null)
      if (!updateResult) {
        return res
          .status(500)
          .json({ message: 'Could not add project to team' })
      }

      return res.status(201).json({
        message: 'Project added!',
        project: formatId(project.toObject()),
      })
    } else {
      // If user is not a member of the team,
      throw new Error()
    }
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: 'No team found with that ID' })
  }
}

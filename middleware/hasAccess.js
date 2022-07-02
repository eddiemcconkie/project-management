const { getUser } = require('../lib/helpers')
const Team = require('../models/team')
const Project = require('../models/project')

/**
 * Has Access Middleware
 * @description Checks the request parameters to see if the user can access
 * the Team, Project, or Task
 * @type {import('express').RequestHandler}
 */
exports.hasAccess = async (req, res, next) => {
  let { teamId, projectId, taskId } = req.params

  const user = await getUser(req)

  try {
    // Check if the user has access to the task
    if (taskId) {
      const project = await Project.findOne({
        tasks: { $elemMatch: { $eq: taskId } },
      })
      projectId = project._id
    }

    // Check if the user has access to the project
    if (projectId) {
      const team = await Team.findOne({
        projects: { $elemMatch: { $eq: projectId } },
      }).populate('members', 'email')
      console.log('Team: ' + team)
      if (team.members.findIndex((u) => u.email === user.email) < 0) {
        throw new Error()
      }
    }

    // Check if the user belongs to the team
    if (teamId) {
      const team = await Team.findById(teamId).populate('members', 'email')
      if (team.members.findIndex((u) => u.email === user.email) < 0) {
        throw new Error()
      }
    }
  } catch (error) {
    return res.status(404).json({ message: 'Invalid ID' })
  }

  // Good to go
  return next()
}

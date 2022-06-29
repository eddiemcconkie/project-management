const Team = require('../models/team')
const Project = require('../models/project')
const { getUser, getIdFromEmail, formatId } = require('../lib/helpers')

// app.post("/", async (req, res) => {
//   const newTeam = await Team.create({
//     name: "Team 1",
//     members: [],
//     projects: [],
//   });
//   res.status(201).json({ team: newTeam });
// });

// app.put('/', async (req, res) => {
//   // const updateTeam = await Team.findOneAndUpdate()
//   Team.findByIdAndUpdate(
//     req.params.ObjectId,
//     req.body,
//     { new: true },
//     (err, result) => {
//       if (err) return res.status(500).send(err)
//       return res.send(result)
//     }
//   )
// })

exports.retrieveAll = async (req, res) => {
  try {
    const teams = await Team.find()
    console.log(teams)
    res.status(200).send(teams)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.retrieveOne = async (req, res) => {
  try {
    const team = await Team.findById(req.params.ObjectId)
    console.log(team)
    res.status(200).send(team)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateTeam = async (req, res) => {
  Team.findByIdAndUpdate(
    req.params.ObjectId,
    req.body,
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(result)
    }
  )
}

const addMember = (req) =>
  Team.findByIdAndUpdate(
    req.params.ObjectId,
    req.body,
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(err)
      return res.status(200).send(result)
    }
  )

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Add Project to Team
 * @param {Request} req
 * @param {Response} res
 */
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
        project: formatId(saveResult),
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

// const deleteMember = Team.findByIdAndRemove(
//   req.params.ObjectId,
//   (err, result) => {
//     if (err) return res.status(500).send(err);
//     return res.status(200).send(result);
//   }
// );

// app.get('/', async (req, res) => {
//   Team.find((err, result) => {
//     if (err) return res.status(500).send(err)
//     return res.status(200).send(result)
//   })
// })

// app.get('/:id', async (req, res) => {
//   Team.findById(req.params.ObjectId, (err, result) => {
//     if (err) return res.status(500).send(err)
//     return res.status(200).send(result)
//   })
// })

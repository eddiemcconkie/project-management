const Team = require('../models/team')

app.post('/', async (req, res) => {
  const newTeam = await Team.create({
    name: 'Team 1',
    members: [],
    projects: [],
  })
  res.status(201).json({ team: newTeam })
})

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

const retrieveAll = () =>
  Team.find((err, result) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(result)
  })

const retrieveOne = (req, res) => {
  return Team.findById(i, (err, result) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(result)
  })
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

const deleteMember = Team.findByIdAndRemove(
  req.params.ObjectId,
  (err, result) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(result)
  }
)

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

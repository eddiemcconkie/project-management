const Team = require("../models/team");
const Project = require("../models/project");

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
    const teams = await Team.find();
    console.log(teams);
    res.status(200).send(teams);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.retrieveOne = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    console.log(team);
    res.status(200).send(team);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateTeam = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).send({ message: "Missing Email" });
  }

  const userId = getIdFromEmail(req.body.email)
  if (!userId){
    return res.status(400).json()
  }

  Team.findByIdAndUpdate(
    req.params.id,
    {$push:{members: userId}}
    // req.body.email,
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    }
  );
};

const addMember = (req) =>
  Team.findByIdAndUpdate(
    req.params.ObjectId,
    req.body,
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    }
  );

exports.addProjectToTeam = async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await Team.findById(teamId);
    console.log(team);
    const project = req.body;
    console.log(project);
    // Validate project
    // ...
    const newProject = await Project.create(project);
    console.log(newProject);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Invalid ID");
  }

  res.send("");
};

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

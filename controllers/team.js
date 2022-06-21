app.post("/", async (req, res) => {
  const newTeam = await Team.create({
    name: "Team 1",
    members: [],
    projects: [],
  });
  res.status(201).json({ team: newTeam });
});

app.put("/", async (req, res) => {
  const updateTeam = await Team.findOneAndUpdate();
});

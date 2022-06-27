const express = require("express");
const routes = express.Router();
const teamController = require("../controllers/team");

routes.get("/", teamController.retrieveAll);

routes.get("/:id", teamController.retrieveOne);

routes.post("/");

routes.post("/:teamId/projects", teamController.addProjectToTeam);

routes.put("/:id", teamController.updateTeam);

routes.delete("/:id");

module.exports = routes;

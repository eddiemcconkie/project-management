const express = require("express");
const routes = express.Router();
const projectController = require("../controllers/project");

routes.get("/", projectController.retrieveAll);

routes.get("/:id", projectController.retriveOne);

routes.get("/:id/tasks");

routes.post("/");

routes.put("/:id", projectController.updateProject);

routes.delete("/:id");

module.exports = routes;

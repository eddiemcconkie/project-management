const express = require("express");
const routes = express.Router();
const taskController = require("../controllers/task");

routes.get("/:id", taskController.retrieveTask);

routes.post("/project/:id/tasks");

routes.put("/:id", taskController.updateTask);

routes.delete("/projects/:id/tasks/:id");

module.exports = routes;

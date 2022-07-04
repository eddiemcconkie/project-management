const express = require("express");
const routes = express.Router();
const projectController = require("../controllers/project");
const { hasAccess } = require("../middleware/hasAccess");

routes.get("/", projectController.retrieveAll);
routes.get("/:projectId", hasAccess, projectController.retrieveOne);
routes.get("/:projectId/tasks", hasAccess, projectController.getProjectTasks);
routes.put("/:projectId", hasAccess, projectController.updateProject);
routes.delete("/:projectId", hasAccess);

module.exports = routes;

const express = require("express");
const routes = express.Router();

routes.get("/:id");

routes.post("/project/:id/tasks");

routes.put("/:id");

routes.delete("/projects/:id/tasks/:id");

module.exports = routes;

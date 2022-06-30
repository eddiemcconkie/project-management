const express = require('express')
const routes = express.Router()
const taskController = require('../controllers/task')
const { hasAccess } = require('../middleware/hasAccess')

routes.get('/:taskId', hasAccess, taskController.retrieveTask)
routes.post('/project/:projectId/tasks', hasAccess)
routes.put('/:taskId', hasAccess, taskController.updateTask)
routes.delete('/tasks/:taskId', hasAccess)

module.exports = routes

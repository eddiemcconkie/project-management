const express = require('express')
const routes = express.Router()
const taskController = require('../controllers/task')
const { hasAccess } = require('../middleware/hasAccess')

routes.get('/:taskId', hasAccess, taskController.retrieveTask)
routes.put('/:taskId', hasAccess, taskController.updateTask)
routes.delete('/:taskId', hasAccess, taskController.deleteTask)

module.exports = routes

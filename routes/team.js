const express = require('express')
const routes = express.Router()
const teamController = require('../controllers/team')
const { hasAccess } = require('../middleware/hasAccess')

routes.get('/', teamController.retrieveAll)
routes.get('/:teamId', hasAccess, teamController.retrieveOne)
routes.post('/')
routes.post('/:teamId/projects', hasAccess, teamController.addProjectToTeam)
routes.put('/:teamId', hasAccess, teamController.updateTeam)
routes.delete('/:teamId', hasAccess)

module.exports = routes

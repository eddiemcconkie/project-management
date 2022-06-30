const express = require('express')
const routes = express.Router()

routes.use('/teams', require('./team'))
routes.use('/projects', require('./project'))
routes.use('/tasks', require('./task'))

module.exports = routes

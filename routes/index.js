const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('../swagger.json')
const routes = express.Router()

routes.use('/api-docs', swaggerUi.serve)
routes.get('/api-docs', swaggerUi.setup(swaggerDoc))
routes.use('/teams', require('./team'))
routes.use('/projects', require('./project'))
routes.use('/tasks', require('./task'))

module.exports = routes

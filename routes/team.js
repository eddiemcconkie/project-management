const express = require('express')
const routes = express.Router()

routes.get('/')

routes.get('/:id')

routes.post('/')

routes.put('/:id')

routes.delete('/:id')

module.exports = routes

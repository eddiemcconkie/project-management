require('dotenv').config()
// const mongodb = require('./db/connect')
const express = require('express')
// const cors = require('cors')
// const contactsRouter = require('./routes/contacts')
// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')
// const swaggerDevDocument = require('./swagger-dev.json')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  )
  res.setHeader('Application-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})
app.use('/contacts', contactsRouter)
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(
//     process.env.NODE_ENV === 'dev' ? swaggerDevDocument : swaggerDocument
//   )
// )

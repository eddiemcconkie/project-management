require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { auth, requiresAuth } = require('express-openid-connect')
const swaggerUi = require('swagger-ui-express')

const app = express()

// Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Auth0
/** @type {import('express-openid-connect').ConfigParams} */
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  authRequired: false,
  attemptSilentLogin: true,
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  console.log(req.oidc.user)
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

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

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(
    process.env.NODE_ENV === 'production'
      ? require('./swagger.json')
      : require('./swagger-dev.json')
  )
)

// app.use('/', requiresAuth(), require('./routes'))
app.use('/', require('./routes'))

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

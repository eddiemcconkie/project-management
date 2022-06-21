require("dotenv").config();
// const mongodb = require('./db/connect')
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const contactsRouter = require('./routes/contacts')
// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')
// const swaggerDevDocument = require('./swagger-dev.json')

const app = express();

// Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const { auth } = require("express-openid-connect");

// Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  console.log(req.oidc.user);
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Application-Type", "application/json");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(
//     process.env.NODE_ENV === 'dev' ? swaggerDevDocument : swaggerDocument
//   )
// )
const Team = require("./models/team");

app.get("/", async (req, res) => {
  // const newTeam = await Team.create({
  //   name: 'Team 1',
  //   members: [],
  //   projects: [],
  // })
  // res.status(201).json({ team: newTeam })

  const newTeam = new Team({ name: "Team 1", members: [], projects: [] });
  newTeam.save((err, team) => {
    if (err) {
      res.status(500).json({ message: "Error creating team" });
    }

    res.status(201).json({ message: "Team created", team });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

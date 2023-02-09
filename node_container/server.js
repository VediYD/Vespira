// installed imports
import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";

// project module imports
import routes from "./app/routes/routes.js";
import dbconnections from "./app/dbconnections.js";
import bodyParser from "body-parser";

// making sure the environment variables defined in .env file are loaded
dotenv.config();

// describe the port on which the server runs
var port = process.env.APP_PORT;

// intialize express app object
var app = express();

// configuring the app-level middleware
// logging all requests made
app.use(morgan("dev"));

// add capability to parse json requests > put parsed info to req.body
app.use(express.json());

// add capability to parse x-www-form-urlencoded requests > put parsed info to req.body
app.use(express.urlencoded({ extended: false }));

// using json body parser
app.use(bodyParser.json({ type: "application/json" }));

// using defined routes from routes.js
app.use("/", routes);

// serving of static files through public folder
app.use(express.static(path.dirname(".") + "/app/views"));

// using browser sessions
app.use(
  session({
    name: "login-session",
    secret: process.env.APP_SECRET,
    store: dbconnections.createMongoStore(session),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000, secure: true, httpOnly: true },
  })
);

// simpler security protocols
app.use(
  cors({
    origin: "http://localhost:" + port,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

// listen on designated port
app.listen(port, () => {
  console.log("App listening to: " + port);
});

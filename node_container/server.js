// installed imports
import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";

// project module imports
import routes from "./app/routes/routes.js";

// describe the port on which the server runs
var port = process.env.port || 3000;

// intialize express app object
var app = express();

// configuring the app-level middleware
// logging all requests made
app.use(morgan("dev"));

// using defined routes from routes.js
app.use("/", routes);

// serving of static files through public folder
app.use(express.static(path.dirname(".") + "/app/views"));

// add capability to parse json requests > put parsed info to req.body
app.use(express.json());

// add capability to parse x-www-form-urlencoded requests > put parsed info to req.body
app.use(express.urlencoded({ extended: false }));

// simpler security protocols
app.use(cors());

// listen on designated port
app.listen(port, () => {
  console.log("App listening to: " + port);
});

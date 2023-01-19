// installed imports
import express from "express";
import cors from "cors";
import path from "path";

// describe the port on which the server runs
var port = process.env.port || 3000;

// intialize express app object
var app = express();

// configuring the app-level middleware
// serving of static files through public folder
app.use(express.static(path.dirname(".") + "/public"));

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

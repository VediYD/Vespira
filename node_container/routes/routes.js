// installed imports
import express from "express";

// custom module imports
// import controller from "../controller/controller.js";

// initializing router object
var router = express.Router();

router.get("/login", (req, res) => {
  console.log("/login");
  res.send("login page");
});

router.get("/home", (req, res) => {
  console.log("/home");
  res.send("home page");
});

export default router;

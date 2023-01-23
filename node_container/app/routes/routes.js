// installed imports
import express from "express";

// custom module imports
import controller from "../controller/controller.js";

// initializing router object
var router = express.Router();

router.get("/home", (req, res) => {
  res.send("home page");
});

export default router;

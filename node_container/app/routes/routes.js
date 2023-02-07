// installed imports
import express from "express";

// custom module imports
import controller from "../controller/controller.js";

// initializing router object
var router = express.Router();

router.get("/home", (req, res) => {
  res.send("home page");
});

router.post("/login", (req, res) => {
  controller.userControllerVerify(req, res, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ msg: result });
    }
  });
});

export default router;

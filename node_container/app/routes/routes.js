// installed imports
import express from "express";

// custom module imports
import controller from "../controller/controller.js";

// initializing router object
var router = express.Router();

// default page and login page have same html files
router.get(["/", "/login"], (req, res) => {
  res.sendFile("login.html", { root: "./app/views" });
});

// separate page for user registration
router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "./app/views" });
});

// separate page for forgotpassword
router.get("/forgot-password", (req, res) => {
  res.send("forgot password page");
});

// separate html for homepage
router.get("/home", (req, res) => {
  res.sendFile("homepage.html", { root: "./app/views" });
});

router.post("/login", (req, res) => {
  controller.userControllerVerify(req, res, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        res.redirect("/home");
      } else {
        res.json({ msg: "Incorrect username / password" });
      }
    }
  });
});

router.post("/register", (req, res) => {
  // console.log("REGISTER BODY", req.body);
  controller.userControllerRegister(req, res, (err, result) => {
    if (err) {
      console.log(err.message);
      res.json({ msg: err.message });
    } else {
      res.json({ msg: result });
    }
  });
});

router.post("/registerCheck", (req, res) => {
  // console.log("CHECK BODY", req.body);
  controller.userControllerCheckAvailable(req, res, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ msg: result });
    }
  });
});

export default router;

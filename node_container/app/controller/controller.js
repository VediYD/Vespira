import models from "../models/models.js";

// function userController()
function userControllerVerify(req, res, callback) {
  // extract the username and password from request body
  var username = req.body.username;
  var password = req.body.password;

  // calls to input sterilizing functions will go here

  // call the verify user
  models.verifyUser(username, password, callback);
}

async function userControllerRegister(req, res, callback) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // console.log(username, password, email);

  try {
    await models.registerUser(username, email, password);
    callback(null, "user registered successfully");
  } catch (err) {
    callback(err, null);
  }
}

function tryCheck(reqBody, _checkField, _checkValue, callback) {
  try {
    models.checkUser(_checkField, _checkValue, (result) => {
      if (result) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  } catch (err) {
    callback(err, null);
  }
}

function userControllerCheckAvailable(req, res, callback) {
  // console.log("BODY", req.body);
  if (Object.keys(req.body).length == 0) {
    // console.log("nothing entered yet");
    callback(null, false);
  } else {
    if (Object.keys(req.body).includes("username")) {
      // check if username exists
      var checkField = "username";
      var checkValue = req.body.username;
      tryCheck(req.body, checkField, checkValue, callback);
    } else if (Object.keys(req.body).includes("email")) {
      // check if email exists
      var checkField = "email";
      var checkValue = req.body.email;
      tryCheck(req.body, checkField, checkValue, callback);
    } else {
      // do nothing
    }
  }
}

export default {
  userControllerVerify,
  userControllerRegister,
  userControllerCheckAvailable,
};

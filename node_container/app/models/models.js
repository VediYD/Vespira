import bcrypt from "bcrypt";

// load connection from dbconnections.js
import dbconnections from "../dbconnections.js";

// verify user
function verifyUser(userJson, callback) {
  var entered_username = userJson["username"];
  var entered_password = userJson["password"];
  // need to perform one way hashing and ensure only hash value is stored in the database from register user

  // query the database for the provided user
  // prettier-ignore
  dbconnections.clientMain
    .db()
    .collection("UserMaster")
    .find({ "username": entered_username })
    .toArray((err, docs) => {
      if (err) { 
        callback(err, null);
      }
      if (!docs.length) {
        callback(null, "no such user");
      } else {
        // check if passwords match
        if (docs[0]["password"] == entered_password) {
          callback(null, "password is correct");
        } else {
          callback(null, "password is incorrect");
        }
      }
    });
}

// update password

// create new user / register user
// remember to check if the username is already taken

// delete user

export default { verifyUser };

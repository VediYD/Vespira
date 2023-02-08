import bcrypt, { hash } from "bcrypt";

// load connection from dbconnections.js
import dbconnections from "../dbconnections.js";

// verify user
function verifyUser(username, password, callback) {
  // query the database for the provided user
  // prettier-ignore
  dbconnections.clientMain
    .db()
    .collection("UserMaster")
    .find({ "username": username })
    .toArray(async (err, docs) => {
      if (err) { 
        callback(err, null);
      }
      if (!docs.length) {
        callback(null, "no such user");
      } else {
        if (username=="dev") {
          // for dev user skip bcrypt check
          var pwdCheck = docs[0]["password"]==password
        }
        else {
          // for non dev check with bcrypt
          var pwdCheck = await bcrypt.compare(password, docs[0]["password"])
        }

        // check if passwords match
        if (pwdCheck) {
          callback(null, "password is correct");
        } else {
          callback(null, "password is incorrect");
        }
      }
    });
}

// update password

// create new user / register user
async function registerUser(username, email, password) {
  const _test = await dbconnections.clientMain
    .db()
    .collection("UserMaster")
    .findOne({ username: username });
  console.log(_test);
  // remember to check if the username is already taken
  // prettier-ignore
  if (
    _test
  ) {
    console.log('Alert?')
    // alert("UserName Already Taken");
  }

  // prettier-ignore
  if (
    await dbconnections.clientMain
      .db()
      .collection("UserMaster")
      .findOne({ "email": email })
  ) {
    console.log("UserEmail Already Taken");
  }

  // need to perform one way hashing and ensure only hash value is stored in the database from register user
  const hashedPassword = await bcrypt.hash(password, 10);

  // prettier-ignore
  dbconnections.clientMain
    .db()
    .collection("UserMaster")
    .insertOne({
      'id': Date.now().toString(),
      "username": username,
      "email": email,
      "password": hashedPassword
    })
}

async function checkUser(checkField, checkValue, callback) {
  if (checkField == "username") {
    // prettier-ignore
    var _test = await dbconnections.clientMain
    .db()
    .collection("UserMaster")
    .findOne({ "username": checkValue });
  } else if (checkField == "email") {
    // prettier-ignore
    var _test = await dbconnections.clientMain
      .db()
      .collection("UserMaster")
      .findOne({ "email": checkValue });
  } else {
    throw new Error("This should not get triggered");
  }
  callback(_test);
}
// delete user

export default { verifyUser, registerUser, checkUser };

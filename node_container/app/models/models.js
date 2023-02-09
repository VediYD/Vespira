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

        // console.log(docs[0]["password"], password, pwdCheck)
        
        // check if passwords match
        if (pwdCheck) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }
    });
}

// update password

// create new user / register user
async function registerUser(username, email, password) {
  // console.log(username, email, password);

  // prettier-ignore
  var userCheck = await dbconnections.clientMain
    .db()
    .collection("UserMaster")
    .findOne({ "username": username });

  // prettier-ignore
  var emailCheck = await dbconnections.clientMain
    .db()
    .collection("UserMaster")
    .findOne({ "email": email });

  // console.log(emailCheck);
  // console.log(userCheck);

  if (userCheck) {
    // first check if the username is already taken
    throw new Error("User Already Exists");
  } else if (emailCheck) {
    // then check if the email id is taken
    throw new Error("Email Already Taken");
  } else {
    // if neither are taken then proceed with user creation
    // need to perform one way hashing and ensure only hash value is stored in the database from register user
    bcrypt.genSalt(10, (errSalt, salt) => {
      if (errSalt) {
        throw errSalt;
      } else {
        bcrypt.hash(password, salt, (errHash, hash) => {
          if (errHash) {
            throw errHash;
          } else {
            console.log(password, hash);

            // update db
            dbconnections.clientMain.db().collection("UserMaster").insertOne({
              id: Date.now().toString(),
              username: username,
              email: email,
              password: hash,
            });
          }
        });
      }
    });
  }
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

// installed imports
import mongodb from "mongodb";
import dotenv from "dotenv";

// loading environment configurations before using them
dotenv.config();

// reading the environmental configurations
var user = process.env.DB_USER;
var pwd = process.env.DB_PWD;
var host = process.env.DB_HOST;
var port = process.env.DB_PORT;

// connection to main mongodb
const uriMain = `mongodb://${user}:${pwd}@${host}:${port}/main_db`;
const clientMain = new mongodb.MongoClient(uriMain, {
  useNewUrlParser: true,
});

// initializing connection to database
clientMain.connect((err) => {
  if (!err) {
    console.log("MongoDB - Main-DB Connected");
  } else {
    console.log("Error Connecting to Main-DB");
  }
});

// connection to main mongodb
const uriLog = `mongodb://${user}:${pwd}@${host}:${port}/log_db`;
const clientLog = new mongodb.MongoClient(uriLog, {
  useNewUrlParser: true,
});

// initializing connection to database
clientLog.connect((err) => {
  if (!err) {
    console.log("MongoDB - Log-DB Connected");
  } else {
    console.log("Error Connecting to Log-DB");
  }
});

export default { clientMain, clientLog };

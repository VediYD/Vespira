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

// connection to mongodb
const uri = `mongodb://${user}:${pwd}@${host}:${port}/main_db`;
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
});

// initializing connection to database
client.connect((err) => {
  if (!err) {
    console.log("MongoDB - Main-DB Connected");
  } else {
    console.log("Error Connecting to Main-DB");
  }
});

export default { client };

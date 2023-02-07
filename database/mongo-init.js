// initializing the main database File
maindb = db.getSiblingDB("main_db");
logdb = db.getSiblingDB("log_db");

// creating the user to manipulate the database
maindb.createUser({
  user: "dev",
  pwd: "pwd1223",
  roles: [{ role: "readWrite", db: "main_db" }],
});
logdb.createUser({
  user: "dev",
  pwd: "pwd1223",
  roles: [{ role: "readWrite", db: "log_db" }],
});

// creating the collections
maindb.createCollection("UserMaster");
maindb.createCollection("UserHistory");
maindb.createCollection("PrescriptionHistory");
maindb.createCollection("OrderHistory");
maindb.createCollection("PharmacyMaster");
maindb.createCollection("DoctorMaster");
maindb.createCollection("PrescriptionsMaster");
maindb.createCollection("PaymentHistory");

// adding a platform user called dev
maindb.UserMaster.insert({ username: "dev", password: "devpass" });

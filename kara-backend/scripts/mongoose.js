const mongoose = require("mongoose");
const config = require("../models/config");

connect();

function connect() {
  mongoose.connect(
    config.mongoDb.url,
    { useNewUrlParser: true }
  );

  listenToMongooseEvents();
}

function listenToMongooseEvents() {
  mongoose.connection.removeAllListeners();

  mongoose.connection.on("error", function(err) {
    console.log(err);
  });

  mongoose.connection.on("open", function() {
    console.log("database connected");
  });
}

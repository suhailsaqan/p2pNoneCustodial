const server = require("./app");
const mongoose = require("mongoose");
const config = require("./config");

const connect = (url) => {
  return mongoose.connect(url, config.db.options);
};

if (require.main === module) {
  connect(config.db.test);
  mongoose.connection.on("error", console.log);
}

module.exports = { connect };

require("./lightning/connect");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  //   path: "/chat/",
});

const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("./auth/local");
const jwtStrategy = require("./auth/jwt");
const expressValidator = require("express-validator");
const config = require("./config");
const bodyParser = require("body-parser");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use(morgan("common"));
app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);

require("./eventEmitter")(app, io);

require("./routes")(app);

global.io = server.listen(config.port);

const socketEvents = require("./socketEvents")(io);

module.exports = { server };

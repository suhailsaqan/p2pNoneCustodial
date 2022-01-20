require("./lightning/connect");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const WebSockets = require("./utils/WebSockets.js");

const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("./auth/local");
const jwtStrategy = require("./auth/jwt");
const expressValidator = require("express-validator");
const config = require("./config");

app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use(morgan("common"));
app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);

require("./routes")(app);

server.listen(config.port);

io.on("connection", WebSockets.connection);

module.exports = server;

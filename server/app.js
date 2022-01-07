require("./lightning/connect");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("common"));

require("./routes")(app);

module.exports = app;

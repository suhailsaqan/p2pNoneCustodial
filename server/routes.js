const contracts = require("./controllers/contracts");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    something: "says hi",
  });
});

// Test routers
router.get("/test", (req, res) => {
  res.json({
    Eminem: "GOATED",
  });
});

module.exports = (app) => {
  app.use("/", router);
};

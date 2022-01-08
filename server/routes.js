const contracts = require("./controllers/contracts");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    something: "says hi",
  });
});

router.get("/contract/:id", contracts.getContracts);
router.post("/contract", contracts.createContract);

// Test routers
router.get("/test", (req, res) => {
  res.json({
    Eminem: "GOATED",
  });
});

module.exports = (app) => {
  app.use("/", router);

  app.get("*", (req, res) => {
    res.status(404).json({ message: "not found" });
  });

  app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ message: "bad request" });
    }
    next(err);
  });
};

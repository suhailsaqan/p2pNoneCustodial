const contracts = require("./controllers/contracts");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    Jesus_Christ: "Lord and Savior",
  });
});

router.get("/contract", contracts.getContracts);
router.get("/contract/:id", contracts.getContract);
router.post("/contract", contracts.createContract);

router.get("/status/:id/:party", contracts.getStatus);

router.get("/settle", contracts.settleContract);
router.get("/cancel", contracts.cancelContract);

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

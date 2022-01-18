const contracts = require("./controllers/contracts");
const users = require("./controllers/users");
const { jwtAuth, contractAuth } = require("./auth");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    Jesus_Christ: "Lord and Savior",
  });
});

// Authentication routers
router.post("/login", users.validate(), users.login);
router.post("/register", users.validate("register"), users.register);
router.post("/forgotPassword", users.forgot);
router.post("/updatepassword", users.updatepassword);
router.post(
  "/changepassword",
  users.validate("changepassword"),
  users.changePassword
);

// Contract routers
router.get("/contract", jwtAuth, contracts.getContracts);
router.get("/contract/:id", jwtAuth, contracts.getContract);
router.post("/contract", jwtAuth, contracts.createContract);
router.get("/status/:id/:party", jwtAuth, contracts.getStatus);
router.post("/settle", jwtAuth, contracts.settleContract);
router.get("/settle/status/:id/:party", jwtAuth, contracts.getSettleStatus);
router.post("/cancel", jwtAuth, contracts.cancelContract);
router.get("/cancel/status/:id/:party", jwtAuth, contracts.getCancelStatus);
router.post("/invoice", jwtAuth, contracts.addInvoice);
router.get("/t/:id/:party", contracts.t);

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

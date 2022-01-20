const contracts = require("./controllers/contracts");
const users = require("./controllers/users");
const chatroom = require("./controllers/chatroom");
const { jwtAuth, contractAuth } = require("./auth");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
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
router.get("/contract", contracts.getContracts);
router.get("/contract/:id", jwtAuth, contracts.getContract);
router.post("/contract", jwtAuth, contracts.createContract);
router.get("/status/:id/:party", jwtAuth, contracts.getStatus);
router.post("/settle", jwtAuth, contracts.settleContract);
router.get("/settle/status/:id/:party", jwtAuth, contracts.getSettleStatus);
router.post("/cancel", jwtAuth, contracts.cancelContract);
router.get("/cancel/status/:id/:party", jwtAuth, contracts.getCancelStatus);
router.post("/invoice", jwtAuth, contracts.addInvoice);
router.get("/t/:id/:party", contracts.t);

// Chatroom routers
router.get("/chatroom/:roomId", jwtAuth, chatroom.getMessagesByRoomId);
router.post("/chatroom/initiate", chatroom.initiateChat);
router.post("/chatroom/:roomId/message", chatroom.postMessage);
router.put(
  "/chatroom/:roomId/mark-read",
  chatroom.markConversationReadByRoomId
);
router.delete("/chatroom/room/:roomId", chatroom.deleteRoomById);
router.delete("/chatroom/message/:messageId", chatroom.deleteMessageById);

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

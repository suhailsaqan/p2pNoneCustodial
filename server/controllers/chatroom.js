const makeValidation = require("@withvoid/make-validation");
const ChatRoomModel = require("../models/chatroom");
const ChatMessageModel = require("../models/chat_message");
const UserModel = require("../models/user");

checkUserInChatroom = async (chatroomId, userId) => {
  try {
    const chatroom = await ChatRoomModel.getChatRoomByRoomId(chatroomId);
    return chatroom.userIds.includes(userId);
  } catch (err) {
    next(err);
  }
};

exports.initiateChat = async (req, res, next) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        users: {
          type: types.array,
          options: { unique: true, empty: false, stringOnly: false },
        },
        // type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
      },
    }));
    if (!validation.success) res.json({ ...validation });

    const { users } = req.body;
    const allUsers = [...users];
    const chatRoom = await ChatRoomModel.initiateChat(allUsers);
    res.status(200).json(chatRoom);
  } catch (err) {
    next(err);
  }
};

exports.postMessage = async (req, res, next) => {
  try {
    let { roomId, message } = req.body;
    message = message.message;
    const validation = makeValidation((types) => ({
      payload: { roomId, message },
      checks: {
        message: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });

    const currentLoggedUser = req.user.id;
    // console.log(roomId, message, currentLoggedUser);
    const newMessage = await ChatMessageModel.createPostInChatRoom(
      roomId,
      message,
      currentLoggedUser
    );
    console.log(newMessage);
    const eventEmitter = req.app.get("eventEmitter");
    eventEmitter.emit("new_message", { roomId: roomId, message: newMessage });
    res.status(200).json(newMessage);
  } catch (err) {
    next(err);
  }
};

exports.getMessagesByRoomId = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const currentLoggedUser = req.user.id;

    const user = await UserModel.findById(currentLoggedUser);
    console.log(user);

    if (!(await checkUserInChatroom(roomId, currentLoggedUser))) {
      console.log("user not in chatroom");
      return res
        .status(400)
        .json({ message: "user unauthorized to access chatroom" });
    }

    const options = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 15,
    };

    const recentConversation = await ChatMessageModel.getConversationByRoomId(
      roomId,
      options
    );
    console.log("recentConversation", recentConversation);
    res.status(200).json(recentConversation);
  } catch (err) {
    next(err);
  }
};

exports.markConversationReadByRoomId = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
    if (!room) {
      res.json({ message: "No room exists for this id" });
    }

    const currentLoggedUser = req.user.id;
    const result = await ChatMessageModel.markMessageRead(
      roomId,
      currentLoggedUser
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoomModel.remove({ _id: roomId });
    const messages = await ChatMessageModel.remove({ chatRoomId: roomId });
    res.status(200).json({
      message: "Operation performed succesfully",
      deletedRoomsCount: room.deletedCount,
      deletedMessagesCount: messages.deletedCount,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await ChatMessageModel.remove({ _id: messageId });
    res.status(200).json({
      deletedMessagesCount: message.deletedCount,
    });
  } catch (err) {
    next(err);
  }
};

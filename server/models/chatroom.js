const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;

const CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: "consumer-to-consumer",
  CONSUMER_TO_SUPPORT: "consumer-to-support",
};

const chatRoomSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => uuidv4().replace(/\-/g, "") },
    userIds: { type: Array, required: true },
  },
  {
    timestamps: true,
    collection: "chatrooms",
  }
);
/**
 * @param {String} userId - id of user
 * @return {Array} array of all chatroom that the user belongs to
 */
chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
  try {
    const rooms = await this.find({ userIds: { $all: [userId] } });
    return rooms;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} roomId - id of chatroom
 * @return {Object} chatroom
 */
chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
  try {
    const room = await this.findOne({ _id: roomId });
    return room;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {Array} userIds - array of strings of userIds
 */
chatRoomSchema.statics.initiateChat = async function (allUsers) {
  try {
    let users = [];
    for (index in allUsers) {
      users.push(allUsers[index].id);
    }
    const newRoom = await this.create({ userIds: users });
    return newRoom;
  } catch (error) {
    console.log("error on start chat method", error);
    throw error;
  }
};

module.exports =
  mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);

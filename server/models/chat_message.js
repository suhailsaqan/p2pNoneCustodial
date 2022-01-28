const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;

const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
  TYPE_IMAGE: "image",
};

const readByRecipientSchema = new mongoose.Schema(
  {
    _id: false,
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

const chatMessageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    chatRoomId: String,
    message: mongoose.Schema.Types.Mixed,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    userId: String,
    readByRecipients: [readByRecipientSchema],
  },
  {
    timestamps: true,
    collection: "chatmessages",
  }
);

/**
 * This method will create a post in chat
 *
 * @param {String} roomId - id of chat room
 * @param {Object} message - message you want to post in the chat room
 * @param {String} userId - user who is posting the message
 */
chatMessageSchema.statics.createPostInChatRoom = async function (
  chatRoomId,
  message,
  userId
) {
  try {
    const post = await this.create({
      chatRoomId,
      message,
      userId,
      readByRecipients: { readByUserId: userId },
    });
    const aggregate = await this.aggregate([
      // get post where _id = post._id
      { $match: { _id: post._id } },
      // do a join on another table called users, and
      // get me a user whose _id = userId
      {
        $lookup: {
          from: "User",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: "$userId" },
      // do a join on another table called chatrooms, and
      // get me a chatroom whose _id = chatRoomId
      {
        $lookup: {
          from: "ChatRoom",
          localField: "chatRoomId",
          foreignField: "_id",
          as: "chatRoomInfo",
        },
      },
      { $unwind: "$chatRoomInfo" },
      { $unwind: "$chatRoomInfo.userIds" },
      // do a join on another table called users, and
      // get me a user whose _id = userIds
      {
        $lookup: {
          from: "User",
          localField: "chatRoomInfo.userIds",
          foreignField: "_id",
          as: "chatRoomInfo.userProfile",
        },
      },
      { $unwind: "$chatRoomInfo.userProfile" },
      // group data
      {
        $group: {
          _id: "$chatRoomInfo._id",
          postId: { $last: "$_id" },
          chatRoomId: { $last: "$chatRoomInfo._id" },
          message: { $last: "$message" },
          type: { $last: "$type" },
          userId: { $last: "$userId" },
          readByRecipients: { $last: "$readByRecipients" },
          chatRoomInfo: { $addToSet: "$chatRoomInfo.userProfile" },
          createdAt: { $last: "$createdAt" },
          updatedAt: { $last: "$updatedAt" },
        },
      },
    ]);
    // return aggregate;
    return post;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} chatRoomId - chat room id
 */
chatMessageSchema.statics.getConversationByRoomId = async function (
  chatRoomId,
  options = {}
) {
  try {
    // return this.aggregate([
    //   { $match: { chatRoomId } },
    //   { $sort: { createdAt: -1 } },
    //   {
    //     $lookup: {
    //       from: "User",
    //       localField: "userId",
    //       foreignField: "_id",
    //       as: "user",
    //     },
    //   },
    //   // { $unwind: "$user" },
    //   { $skip: options.page * options.limit },
    //   { $limit: options.limit },
    //   { $sort: { createdAt: 1 } },
    // ]);
    return this.aggregate([
      { $match: { chatRoomId } },
      // { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      // { $unwind: "$user" },
      // { $skip: options.page * options.limit },
      // { $limit: options.limit },
      // { $sort: { createdAt: 1 } },
    ]);
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} chatRoomId - chat room id
 * @param {String} currentUserOnlineId - user id
 */
chatMessageSchema.statics.markMessageRead = async function (
  chatRoomId,
  currentUserOnlineId
) {
  try {
    return this.updateMany(
      {
        chatRoomId,
        "readByRecipients.readByUserId": { $ne: currentUserOnlineId },
      },
      {
        $addToSet: {
          readByRecipients: { readByUserId: currentUserOnlineId },
        },
      },
      {
        multi: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports =
  mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", chatMessageSchema);

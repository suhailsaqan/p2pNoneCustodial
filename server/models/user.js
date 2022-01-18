const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    resettoken: { type: String },
    lang: { type: String, default: "EN" },
    admin: { type: Boolean, default: false },
    banned: { type: Boolean, default: false },
  },
  { collation: { locale: "en", strength: 1 } }
);

userSchema.set("toJSON", { getters: true });
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  delete obj.password;
  return obj;
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

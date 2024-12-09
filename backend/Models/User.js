const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String, // Use JavaScript's String constructor
    required: true,
  },
  email: {
    type: String, // Use JavaScript's String constructor
    required: true,
    unique: true, // Ensures email uniqueness
  },
  password: {
    type: String, // Use JavaScript's String constructor
    required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;

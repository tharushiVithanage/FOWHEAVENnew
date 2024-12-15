const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

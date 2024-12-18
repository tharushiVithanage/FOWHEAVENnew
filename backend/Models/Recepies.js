const mongoose = require("mongoose");

const recepiesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    lowlength: 7,
  },
});
const RecepiesModel = mongoose.model("Recepies", recepiesSchema);

module.exports = RecepiesModel;

const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("News",newsSchema);

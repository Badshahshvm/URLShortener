const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortCode: String,
  longUrl: String,
});

const urlModel = mongoose.model("url", urlSchema);

module.exports = urlModel;

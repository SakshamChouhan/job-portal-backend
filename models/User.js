const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  skills: [String], // Extracted from resume
  resumeUrl: String, // S3 URL
});

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  skillsRequired: [String],
  location: String,
  jobUrl: String,
});

module.exports = mongoose.model("Job", JobSchema);

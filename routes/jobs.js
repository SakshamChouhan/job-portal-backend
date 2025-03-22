const express = require("express");
const { fetchAllJobs } = require("../utils/scraper"); 
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/recommendations", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    

    if (!user || !Array.isArray(user.skills)) {
      return res.status(400).json({ error: "User skills not found or invalid" });
    }

    if (user.skills.length === 0 && user.resumeUrl == "") {
      return res.json({
        error: "No resume uploaded. Please upload your resume.",
      });
    }

    if (user.skills.length === 0 && user.resumeUrl) {
      return res.json({
        error: "No skills could be extracted from your resume. Please update your resume.",
      });
    }

    const jobs = await fetchAllJobs();
    const recommendedJobs = jobs.map((job) => {
      // Find the matched skills for the job
      const matchedSkills = user.skills.filter((skill) =>
        job.title.toLowerCase().includes(skill.toLowerCase())
      );

      if (matchedSkills.length > 0) {
        return {
          ...job,
          matchedSkills,
        };
      }
    }).filter(job => job !== undefined); 
    if (recommendedJobs.length === 0) {
      return res.status(404).json({
        error: "No jobs found matching your skills",
      });
    }

    console.log(`🎯 Returning ${recommendedJobs.length} recommended jobs`);
    res.json(recommendedJobs); 
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch job recommendations" });
  }
});

module.exports = router;

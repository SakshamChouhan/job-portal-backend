const express = require("express");
const User = require("../models/User");
const { getResumeUrl } = require("../utils/s3");  
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const resumeUrl = user.resumeUrl ? await getResumeUrl(user.resumeUrl) : null;
    
    res.json({
      user: {
        name: user.name,
        email: user.email,
        skills: user.skills || [],
      },
      resumeUrl,  
    });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;

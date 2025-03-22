const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); 

    if (!user || !Array.isArray(user.skills)) {
      return res.status(400).json({ error: "User skills not found or invalid" });
    }


    return res.json({ skills: user.skills });
  } catch (error) {
    console.error("❌ Error fetching skills:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

module.exports = router;

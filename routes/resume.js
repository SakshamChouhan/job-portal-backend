const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { uploadToS3 } = require("../utils/s3"); 
const extractSkills = require("../utils/extractSkills");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File received:", req.file.originalname, req.file.mimetype);

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Invalid file type. Please upload a PDF." });
    }

    const pdfText = (await pdfParse(req.file.buffer)).text;
   
    const extractedSkills = extractSkills(pdfText);

    const s3Url = await uploadToS3(req.file);

    await User.findByIdAndUpdate(req.user.userId, { 
      resumeUrl: s3Url, 
      skills: extractedSkills 
    });

    res.json({ resumeUrl: s3Url, skills: extractedSkills });
  } catch (error) {
    console.error("❌ Resume Upload Failed:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

module.exports = router;

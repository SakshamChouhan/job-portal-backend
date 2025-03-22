const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token Missing" });
    }
    

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;

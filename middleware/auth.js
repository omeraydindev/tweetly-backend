const jwt = require("jsonwebtoken");

// a middleware to check if the provided token is valid 
module.exports = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();

  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid token");
  }
};
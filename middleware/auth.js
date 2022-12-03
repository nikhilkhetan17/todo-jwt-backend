const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { token } = req.cookies;

  // what if token is not there
  if (!token) {
    return res.status(401).send("token is missing");
  }

  // verify token
  try {
    const decode = jwt.verify(token, "shhhh");
    req.user = decode;
  } catch (error) {
    console.log(error);
    res.status(401).send("token is invalid");
  }

  return next();
};

module.exports = auth;

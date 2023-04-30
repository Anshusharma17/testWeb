const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
exports.isAuth = function (req, res, next) {
  console.log("req.headers", req.headers["authorization"]);
  if (
    !req.headers["authorization"] ||
    req.headers["authorization"] === "undefined"
  ) {
    return res.status(401).send({
      msg: "invalid_authorization",
      success: false,
    });
  }
  console.log(req.headers["authorization"]);
  verifyTokenNew(req.headers["authorization"], function (valid) {
    console.log(valid);
    if (!valid) {
      return res.status(401).send({
        msg: "invalid_authorization1",
        success: false,
      });
    } else {
      req.loggedUserData = valid;
      next();
    }
  });
};

exports.generateJwt = (user_id, email) => {
  return jwt.sign(
    {
      id: user_id,
      email: email,
    },
    process.env.SCRECT,
    { expiresIn: "1h" }
  );
};

verifyTokenNew = (token, cb) => {
  jwt.verify(token, process.env.SCRECT, function (err, dcode) {
    if (err) {
      console.log(err);
      cb(false);
    } else {
      cb(dcode);
    }
  });
};

const auth = require("../middlewares/auth");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// new user create account
exports.signup = async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    const data = await user.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

//login user
exports.signin = async (req, res) => {
  // console.log("here", req.body);
  let user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid Password!" });
  }

  let token = auth.generateJwt(user.id, user.email);

  console.log(token);
  let userObject = user.toObject();
  let resp = { ...userObject, id: userObject._id, token: token };

  res.status(200).send(resp);
};

//user sign out
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

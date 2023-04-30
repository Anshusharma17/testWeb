const User = require("../models/user.model");
exports.updateUser = async (req, res) => {
  try {
    const id = req.loggedUserData.id;
    const userRes = await User.findByIdAndUpdate(id, req.body);

    res.status(200).send("updated successfully");
  } catch (err) {
    console.log("error in user createUser", err);
    res.status(500).send();
  }
};

exports.getUser = async (req, res) => {
  try {
    const _id = req.loggedUserData.id;
    const userRes = await User.findById({
      _id,
    });
    res.status(200).send(userRes);
  } catch (err) {
    console.log("error in getUser", err);
    res.status(500).send();
  }
};

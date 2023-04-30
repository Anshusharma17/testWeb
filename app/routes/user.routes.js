const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

module.exports = function (app) {
  app.put("/api/user", auth.isAuth, controller.updateUser);
  app.get("/api/user", auth.isAuth, controller.getUser);
};

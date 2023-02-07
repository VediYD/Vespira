import models from "../models/models.js";

// function userController()
function userControllerVerify(req, res, callback) {
  models.verifyUser(req.body, callback);
}

export default { userControllerVerify };

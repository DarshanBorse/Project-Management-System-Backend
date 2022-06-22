import { getUser } from "../../controller/auth/user.controller";
import { VerifyMiddleware } from "../../middleware/verify.middleware";

const UserRoutes = (app) => {
  app.route("/api/v1/user")
  .get(VerifyMiddleware, getUser);
};

export default UserRoutes
import { Login } from "../../controller/auth/login.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const LoginRoute = (app) => {
  app.route("/api/v1/login").post(authMiddleware, Login);
};

export default LoginRoute;

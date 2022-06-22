import { CreateUser } from "../../controller/auth/register.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const RegisterRoutes = (app) => {
  app
    .route("/api/v1/register")
    // New User
    .post(authMiddleware, CreateUser);
};

export default RegisterRoutes;

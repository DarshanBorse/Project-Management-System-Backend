import { Logout } from "../../controller/auth/logout.controller";
import { VerifyMiddleware } from "../../middleware/verify.middleware";

const LogoutRoute = (app) => {
    app.route('/api/v1/logout')
    .get(VerifyMiddleware, Logout)
};

export default LogoutRoute;

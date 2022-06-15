import { Login } from "../../controller/auth/login.controller"

const LoginRoute = (app) => {
    app.route('/api/v1/login')
    .post(Login)
}

export default LoginRoute
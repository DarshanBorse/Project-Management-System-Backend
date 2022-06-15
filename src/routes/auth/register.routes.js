import { CreateUser } from "../../controller/auth/register.controller"

const UserRoutes = (app) => {
    app.route('/api/v1/register')
    // New User 
    .post(CreateUser)
}

export default UserRoutes;
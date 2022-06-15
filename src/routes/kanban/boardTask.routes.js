import { getProjectBoard } from "../../controller/kanban/boardTask.controller"
import { VerifyMiddleware } from "../../middleware/verify.middleware"

const BoardTaskRoute = (app) => {
    app.route('/api/v1/boardtask/:ID')
        .get(VerifyMiddleware, getProjectBoard)
} 

export default BoardTaskRoute;
import { CreateTask } from "../../controller/kanban/task.controller"
import { VerifyMiddleware } from "../../middleware/verify.middleware"

const TaskRoutes = (app) => {
    app.route('/api/v1/task')
        // Create New task 
        .post(VerifyMiddleware, CreateTask)
}

export default TaskRoutes
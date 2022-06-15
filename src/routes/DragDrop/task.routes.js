import { TaskDND } from "../../controller/kanban/DragDrop/task.controller";
import { VerifyMiddleware } from "../../middleware/verify.middleware";

const TaskDNDRoutes = (app) => {
    app.route('/api/v1/taskdnd')
        .put(VerifyMiddleware,TaskDND)
}

export default TaskDNDRoutes;
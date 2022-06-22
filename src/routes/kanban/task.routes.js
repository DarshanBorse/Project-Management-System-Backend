import {
  CreateTask,
  deleteTask,
  getTask,
  removeDescription,
  updateTask,
} from "../../controller/kanban/task.controller";
import { VerifyMiddleware } from "../../middleware/verify.middleware";

const TaskRoutes = (app) => {
  app
    .route("/api/v1/task")
    // Get all task
    .get(VerifyMiddleware, getTask)
    // Create New task
    .post(VerifyMiddleware, CreateTask)
    // Update Task Name , etc
    .put(VerifyMiddleware, updateTask)
    // Description array element delete
    .delete(VerifyMiddleware, removeDescription);

  app.route("/api/v1/deleteTask").delete(VerifyMiddleware, deleteTask);
};

export default TaskRoutes;

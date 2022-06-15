import { CreateProject, deleteProject, getProject } from "../../controller/kanban/project.controller"
import { VerifyMiddleware } from "../../middleware/verify.middleware"

const ProjectRoutes = (app) => {
    app.route('/api/v1/project')
        // Get all project this user 
        .get(VerifyMiddleware, getProject)
        // Create new Project 
        .post(VerifyMiddleware, CreateProject);

    app.route('/api/v1/project/:proId')
        // Delete a project 
        .delete(VerifyMiddleware, deleteProject)
}

export default ProjectRoutes;
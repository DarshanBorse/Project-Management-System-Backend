import { boardUpdate, CreateBoard, GetBoard, RemoveBoard } from "../../controller/kanban/board.controller"
import { VerifyMiddleware } from "../../middleware/verify.middleware";

const BoardRoutes = (app) => {
    app.route('/api/v1/board/:proId')
            // Get all board 
            .get(VerifyMiddleware, GetBoard)

    app.route('/api/v1/board')
        // Create new board api route 
        .post(VerifyMiddleware, CreateBoard)
        // Updated Board Route 
        .put(VerifyMiddleware, boardUpdate);

    app.route('/api/v1/board/:boardId/:proid')
        // Delete Board api route 
        .delete(VerifyMiddleware, RemoveBoard)
}

export default BoardRoutes;
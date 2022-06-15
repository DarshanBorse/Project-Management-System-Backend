import { boardDND } from "../../controller/kanban/DragDrop/board.controller"
import { VerifyMiddleware } from "../../middleware/verify.middleware";

const BoardDNDRoutes = (app) => {
    app.route('/api/v1/boardDnd')
        .put(VerifyMiddleware,boardDND)
}

export default BoardDNDRoutes;
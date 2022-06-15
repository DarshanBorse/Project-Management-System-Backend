import { BoardModel } from "../../../model/board.model"

export const TaskDND = async (req, res) => {
    if (!req.body.droppableId || req.body.droppableId === '') {
        return res.json({
            message: "Droppable id is a required..."
        })
    } else if (!req.body.draggableId || req.body.draggableId === '') {
        return res.json({
            message: "Draggable id is a required..."
        })
    } else if (req.body.index === '' || req.body.index === undefined || req.body.index === null) {
        return res.json({
            message: "Index is a required..."
        })
    } else if (!req.body.sourcedroppableId || req.body.sourcedroppableId === '') {
        return res.json({
            message: "Source drop id is a required..."
        })
    }

    try {
        BoardModel.findByIdAndUpdate(req.body.sourcedroppableId, { $pull: { taskId: req.body.draggableId } }, { new: true, upsert: true }, ((err, board) => {
            if (err) {
                return res.send(err)
            }

            if (!board) {
                return res.status(401).json({
                    message: "Board not found"
                })
            }

            BoardModel.findByIdAndUpdate(req.body.droppableId, { $push: { taskId: { $each: [req.body.draggableId], $position: req.body.index } } }, { new: true, upsert: true }, (error) => {
                if (error) {
                    return res.send(error)
                }
            })

            return res.json({
                message: "Successfully Drag and Drop"
            })
        }))
    } catch (error) {
        console.error(error);
    }
}
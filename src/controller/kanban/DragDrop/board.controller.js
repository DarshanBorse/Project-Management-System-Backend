import { ProjectModel } from "../../../model/project.model"

export const boardDND = async (req, res) => {
    if (!req.body.droppableId || req.body.droppableId === '') {
        return res.json({
            message: "Droppable id is a required..."
        })
    } else if (!req.body.draggableId || req.body.draggableId === '') {
        return res.json({
            message: "Draggable id is a required..."
        })
    } else if (req.body.index === '') {
        return res.json({
            message: "Index is a required..."
        })
    }

    try {
        ProjectModel.findByIdAndUpdate(req.body.droppableId, { $pull: { boardId: req.body.draggableId } }, { new: true, upsert: true }, ((err, project) => {
            if (err) {
                return res.send(err)
            }

            if (!project) {
                return res.status(401).json({
                    message: "Project not found"
                })
            }

            ProjectModel.findByIdAndUpdate(project._id, { $push: { boardId: { $each: [req.body.draggableId], $position: req.body.index } } }, { new: true, upsert: true }, (error) => {
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
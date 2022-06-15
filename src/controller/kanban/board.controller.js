import { BoardModel } from "../../model/board.model"
import { ProjectModel } from "../../model/project.model";
import { TaskModel } from "../../model/task.model";

export const GetBoard = (req, res) => {
    ProjectModel.findById(req.params.proId)
        .populate({
            path: 'boardId',
            populate: {
                path: 'taskId',
                model: "task"
            }
        }).exec((error, project) => {
            if (error) {
                return res.send(error)
            }

            if (!project) {
                return res.status(404).json({
                    message: 'Project not found...'
                })
            }

            return res.json({
                _id: project._id,
                name: project.name,
                boardId: project.boardId.map((board) => {
                    return {
                        _id: board._id,
                        name: board.name,
                        task: board.taskId.map((task) => {
                            return {
                                taskName: task.name,
                                id: task._id
                            }
                        })
                    }
                })
            });
        })
}


// Create New board 
export const CreateBoard = (req, res) => {
    if (!req.body.projectId || req.body.projectId === '') {
        return res.status(404).json({
            message: "Project Id Required.."
        })
    }

    const newBoard = new BoardModel({
        name: req.body.name
    });

    newBoard.save((error, board) => {
        if (error) {
            return res.send(error)
        }

        ProjectModel.findByIdAndUpdate(req.body.projectId, { $push: { boardId: { $each: [board._id] } } }, { new: true, upsert: true }, (err) => {
            if (err) {
                return res.send(err)
            }
        });

        return res.json({
            message: 'Successfully created the board. ',
            boardName: board.name,
            boardId: board._id
        })
    })
}

// Update Board 
export const boardUpdate = async (req, res) => {
    if (!req.body.boardId) {
        return res.status(404).json({
            message: "Board id is required.."
        })
    }

    try {
        BoardModel.findByIdAndUpdate(req.body.boardId, { name: req.body.name }, { new: true, upsert: true }, (err, board) => {
            if (err) {
                return res.send(err)
            }

            if (!board) {
                return res.status(404).json({
                    message: "Board not found.."
                })
            }

            return res.json({
                message: "Successfully updated",
                id: board._id,
                name: board.name
            })
        })
    } catch (error) {
        console.log(error);
    }
}

// Delete Board 
export const RemoveBoard = async (req, res) => {
    try {
        BoardModel.findById(req.params.boardId, (err, board) => {
            if (err) {
                return res.send(err)
            }

            if (!board) {
                return res.status(404).json({
                    message: "Board not found.."
                })
            }

            TaskModel.deleteMany({ _id: { $in: board.taskId } }, (error) => {
                if (error) {
                    return res.send(error)
                }
            });

            ProjectModel.findByIdAndUpdate(req.params.proid, { $pull: { boardId: board._id } }, { upsert: true, new: true }, (error) => {
                if (error) {
                    return res.send(error)
                }
            })

            BoardModel.findByIdAndDelete(board._id, ((err, board) => {
                if (err) {
                    return res.send(err)
                }

                return res.send(board)
            }))
        })
    } catch (error) {
        console.log(error);
    }
}
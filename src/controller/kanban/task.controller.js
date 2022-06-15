import { BoardModel } from "../../model/board.model";
import { TaskModel } from "../../model/task.model";

export const CreateTask = async (req, res) => {
    const newTasks = new TaskModel({
        name: req.body.name
    });

    if (!req.body.boardId || req.body.boardId === '') {
        return res.send({
            message: "Board id is required..."
        })
    }

    try {
        await newTasks.save((error, task) => {
            if (error) {
                return res.send(error)
            }

            BoardModel.findByIdAndUpdate(req.body.boardId, { $push: { taskId: { $each: [task._id] } } }, { new: true, upsert: true }, (err) => {
                if (err) {
                    return res.send(err)
                }
            })

            return res.json({
                id: task._id,
                name: task.name
            })
        })
    } catch (error) {
        console.error(error);
    }
}
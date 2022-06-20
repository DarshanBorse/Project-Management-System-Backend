import { BoardModel } from "../../model/board.model";
import { TaskModel } from "../../model/task.model";
import { v4 as uuidv4 } from 'uuid';

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

export const updateTask = (req, res) => {
    // if (req.body.taskId === "" || !req.body.taskId) {
    //     return res.send('Task id is required...')
    // }

    TaskModel.findByIdAndUpdate(req.body.taskId, {
        name: req.body.name, $push: {
            description: {
                $each: [{
                    body: req.body.description
                }]
            }
        }
    }, { new: true, upsert: true }, (err, task) => {
        if (err) {
            return res.send(err)
        }

        return res.send(task)
    });
}

export const getTask = (req, res) => {
    TaskModel.find({}, (err, task) => {
        if (err) {
            return res.send(err)
        }

        return res.send(task)
    })
}

export const removeDescription = (req, res) => {
    // console.log(req.query.desId);
    TaskModel.findByIdAndUpdate(req.query.taskId, { $pull: { description: { _id: req.query.desId } } }, { upsert: false, multi: true }, (err, task) => {
        if (err) {
            return res.send(err)
        }

        return res.send(task)
    })
}
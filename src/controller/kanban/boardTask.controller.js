import { ProjectModel } from "../../model/project.model";

export const getProjectBoard = (req, res) => {
    ProjectModel.findById(req.params.ID)
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
                    message: 'User not found...'
                })
            }

            // return res.json({
            //     _id: project._id,
            //     name: project.name,
            //     boardId: project.boardId.map((board) => {
            //         return {
            //             _id: board._id,
            //             name: board.name,
            //             task: board.taskId.map((task) => {
            //                 return {
            //                     taskName: task.name,
            //                     id: task._id
            //                 }
            //             })
            //         }
            //     })
            // });

            return res.send(project)
        })
}

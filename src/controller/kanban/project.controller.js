import { BoardModel } from "../../model/board.model";
import { ProjectModel } from "../../model/project.model"
import { TaskModel } from "../../model/task.model";
import { UserModel } from "../../model/user.model";

export const CreateProject = async (req, res) => {
    const newProject = new ProjectModel({
        name: req.body.name
    });

    await newProject.save((err, project) => {
        if (err) {
            return res.send(err)
        }

        UserModel.findByIdAndUpdate(req.userId, { $push: { projectId: { $each: [project._id] } } }, { new: true, upsert: true }, (error) => {
            if (error) {
                return res.send(error)
            }
        });

        new BoardModel({
            name: "To Do"
        }).save((err, board) => {
            if (err) {
                return res.send(err)
            }

            ProjectModel.findByIdAndUpdate(project._id, { $push: { boardId: { $each: [board._id] } } }, { new: true, upsert: true }, (err) => {
                if (err) {
                    return res.send(err)
                }
            });
        })

        new BoardModel({
            name: "In Process"
        }).save((err, board) => {
            if (err) {
                return res.send(err)
            }

            ProjectModel.findByIdAndUpdate(project._id, { $push: { boardId: { $each: [board._id] } } }, { new: true, upsert: true }, (err) => {
                if (err) {
                    return res.send(err)
                }
            });
        })

        new BoardModel({
            name: "Done"
        }).save((err, board) => {
            if (err) {
                return res.send(err)
            }

            ProjectModel.findByIdAndUpdate(project._id, { $push: { boardId: { $each: [board._id] } } }, { new: true, upsert: true }, (err) => {
                if (err) {
                    return res.send(err)
                }
            });
        })

        return res.send(project)
    })
}

export const getProject = async (req, res) => {
    UserModel.findById(req.userId)
        .populate('projectId')
        .exec((error, user) => {
            if (error) {
                return res.send(error)
            }

            return res.json(user.projectId.map((project) => {
                return {
                    name: project.name,
                    _id: project._id
                }
            }));
        })
}

export const deleteProject = async (req, res) => {
    ProjectModel.findById(req.params.proId)
        .populate({
            path: 'boardId',
            populate: {
                path: 'taskId',
                model: "task"
            }
        }).exec((err, project) => {
            if (err) {
                return res.err
            }

            if (!project) {
                return res.status(404).json({
                    message: "Project Already Delete"
                })
            }

            UserModel.findByIdAndUpdate(req.userId, { $pull: { projectId: project._id } }, { upsert: true, new: true }, (error) => {
                if (error) {
                    return res.send(error)
                }
            });

            BoardModel.deleteMany({ _id: { $in: project.boardId } }, (error) => {
                if (error) {
                    return res.send(error)
                }
            })

            project.boardId.map(data => (
                TaskModel.deleteMany({ _id: { $in: data.taskId } }, (error) => {
                    if (error) {
                        return res.send(error)
                    }
                })
            ));

            ProjectModel.findByIdAndDelete(project._id, (error) => {
                if (error) {
                    return res.send(error)
                }
            })

            return res.json({
                message: "Successfully Deleted...."
            })

        })
}
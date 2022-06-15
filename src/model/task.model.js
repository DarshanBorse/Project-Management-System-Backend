import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Task name is required...']
        }
    },
    {
        timestamps: true
    }
);

export const TaskModel = mongoose.model('task', TaskSchema);
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Task name is required...']
        },
        description: [{
            body: {
                type: String,
                minlength: 3
            },
            date: {
                type: Date,
                default: Date.now()
            },
        }]
    },
    {
        timestamps: true
    }
);

export const TaskModel = mongoose.model('task', TaskSchema);
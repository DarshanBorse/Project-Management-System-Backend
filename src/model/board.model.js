import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BoardSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Board Name is Required."],
            minlength: 3
        },
        taskId: [{
            type: Schema.Types.ObjectId,
            ref: "task"
        }]
    },
    {
        timestamps: true
    }
);

export const BoardModel = mongoose.model('board', BoardSchema);
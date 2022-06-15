import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Project Name is required.."],
            minlength: 3
        },
        boardId: [{
            type: Schema.Types.ObjectId,
            ref: "board"
        }]
    },
    {
        timestamps: true
    }
)

export const ProjectModel = mongoose.model(`project`, ProjectSchema);
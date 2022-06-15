import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required."],
            minlength: 3
        },
        lastName: {
            type: String,
            required: [true, "Last name is required."],
            minlength: 3
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            minlength: 3,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: 3,
            unique: true
        },
        projectId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'project'
            }
        ]
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model('User', UserSchema);
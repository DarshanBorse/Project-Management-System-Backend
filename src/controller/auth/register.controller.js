import bcryptjs from "bcryptjs"
import { UserModel } from "../../model/user.model"

export const CreateUser = (req, res) => {
    const salt = bcryptjs.genSaltSync(8);

    const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password === undefined || req.body.password === '' ? req.body.password : bcryptjs.hashSync(req.body.password, salt),
    });

    newUser.save((error, user) => {
        if (error) {
            if (error.code === 11000 && error.index === 0) {
                return res.status(409).json({
                    message: 'Email already exist..'
                });
            }

            return res.send(error)
        }

        return res.json({
            FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    });
}
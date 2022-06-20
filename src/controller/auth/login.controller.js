import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { UserModel } from "../../model/user.model"

export const Login = (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) {
                return res.send(err)
            }

            if (!user) {
                return res.status(404).json({
                    message: "The provided credentials do not match our records."
                })
            }

            if (!req.body.password) {
                return res.status(404).json({
                    message: "Password Required.."
                })
            }

            const password = bcryptjs.compareSync(req.body.password, user.password)

            if (!password) {
                return res.status(404).json({
                    message: "The provided credentials do not match our records."
                })
            }

            const token = jsonwebtoken.sign({_id: user._id}, process.env.Secret_JWT, {
                expiresIn: process.env.Expire_JWT
            });

            res.cookie(String(user._id), token, {
                path: '/',
                expiresIn: 7 * 24 * 3600 * 1000,
                httpOnly: true,
            });

            return res.json({
                message: "Successfully Login",
                token: token
            });
        })
}
import jsonwebtoken from "jsonwebtoken";

export const VerifyMiddleware = (req, res, next) => {
    // const bearerToken = req.headers['authorization'];

    // if (bearerToken !== undefined) {
    //     const token = bearerToken.split(' ')[1];

    //     jsonwebtoken.verify(token, process.env.JWT_SECRET, (error, decode) => {
    //         if (error) {
    //             return res.send({
    //                 message: "Token has been expired.."
    //             });
    //         };

    //         req.userId = decode._id
    //         next();
    //     });
    // } else {
    //     res.status(403).json({
    //         message: "Send a token and verified..."
    //     });
    // }

    const cookie = req.headers.cookie;

    if (cookie !== undefined) {
        const token = cookie.split('=')[1];

        jsonwebtoken.verify(token, process.env.Secret_JWT, (error, decode) => {
            if (error) {
                return res.status(401).send({
                    message: "Token has been expired..",
                });

            };

            req.userId = decode._id
            next();
        });
    } else {
        res.status(401).json({
            message: "Unauthorized...",
        });
    }
}
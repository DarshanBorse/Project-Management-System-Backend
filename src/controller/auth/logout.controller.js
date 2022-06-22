export const Logout = (req, res) => {
    res.clearCookie(`${req.userId}`);
    req.cookies[`${req.userId}`];

    return res.json({
        message: "Successfully logout..."
    });
};
import { UserModel } from "../../model/user.model";

export const getUser = async (req, res) => {
  try {
    await UserModel.findById(req.userId, (error, user) => {
      if (error) {
        return res.send(error);
      }

      return res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
  } catch (error) {}
};

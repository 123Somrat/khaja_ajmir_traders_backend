import asyncHandeler from "../../../../utils/asyncHandeler";
import authService from "../../../../lib/auth";
import { TUser } from "../../../../models/user/userType";
const register = asyncHandeler(async (req, res, next) => {
  // getting UserInfo from req
  const userInfo = req.body.data;

  // Call userRegistretion service for create user
  const user = await authService.register(userInfo);
  const { name, email, role } = user as TUser;
  // transform user object
  const transFormedUserObject = {
    name,
    email,
    role
  };

  res.status(201).json({
    status: 201,
    code: "Created succesfully",
    messege: "User created successfullly",
    data: transFormedUserObject,
  });
});

export default register;

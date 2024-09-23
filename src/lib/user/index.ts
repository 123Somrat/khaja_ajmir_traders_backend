import userModel from "../../models/user/userSchema";
import TUser from "../../models/user/userType";
import HttpError from "../../utils/customError";

/**
 *
 * @param id
 * @returns if userExiest return true
 */
const isUserExeist = async (email: string) => {
  const isUserExeist = await userModel.findOne({ email });

  return isUserExeist ? true : false;
};

/**
 *
 * @param paylode
 * @returns registerUserData
 */
const createUser = async (paylode: TUser) => {
  try {
    const createdUser = await userModel.create(paylode);

    return createdUser;
  } catch (err) {
    throw new HttpError(
      500,
      "Internal server error",
      "An unexpected error occured"
    );
  }
};

export = { isUserExeist, createUser };

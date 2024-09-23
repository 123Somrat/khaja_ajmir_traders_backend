import userModel from "../../models/user/userSchema";
import TUser from "../../models/user/userType";

/**
 *
 * @param id
 * @returns if userExiest return true
 */
const isUserExeist = async (id: string) => {
  const isUserExeist = await userModel.findById(id);

  return isUserExeist ? true : false;
};

/**
 *
 * @param paylode
 * @returns registerUserData
 */
const register = async (paylode: TUser) => {
  console.log(paylode);
};

export = { isUserExeist, register };

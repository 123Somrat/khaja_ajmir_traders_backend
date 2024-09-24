import userModel from "../../models/user/userSchema";
import TUser from "../../models/user/userType";
import HttpError from "../../utils/customError";
import { generateHash } from "../../utils/hashPassword";

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
 * @param email 
 * @returns user
 */
const user = async(email:string)=>{

  const user = await userModel.findOne({ email });

  return user ? user : '';

}


/**
 *
 * @param paylode
 * @returns registerUserData
 */
const createUser = async ({ name, email, password }: TUser) => {
  try {
    const hashPassword = await generateHash(password);

    const transformedPaylodeAfterPasswordHashed = {
      name,
      email,
      password: hashPassword,
    };

    const createdUser = await userModel.create(
      transformedPaylodeAfterPasswordHashed
    );

    return createdUser;
  } catch (err) {
    throw new HttpError(
      500,
      "Internal server error",
      "An unexpected error occured"
    );
  }
};

export = { isUserExeist, createUser , user};

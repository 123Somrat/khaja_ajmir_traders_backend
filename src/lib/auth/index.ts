import TUser from "../../models/user/userType";
import HttpError from "../../utils/customError";
import { matchingHased } from "../../utils/hashPassword";
import userService from "../user";

/**
 *
 * @param paylode
 * @returns Created user
 */
const register = async (paylode: TUser) => {
  try {
    // Checking userExiest or not
    const isUser = await userService.isUserExeist(paylode.email);

    if (isUser) {
      throw new HttpError(409, "User exeist", "User exeist");
    }

    // Call userService for create user
    const createdUser = await userService.createUser(paylode);

    return createdUser;
  } catch (err) {
    if (err instanceof HttpError) {
      throw new HttpError(err.status, err.code, err.message);
    }
    if (err) {
      throw new HttpError(
        500,
        "Internal server error",
        "An unexpected error occured"
      );
    }
  }
};

const login = async ({email , password}: { email: string; password: string }) => {
  try {
    const isUser = await userService.user(email);

    if (!isUser) {
      throw new HttpError(404, "Not Found", "No user found");
    }

    const isPasswordMatched = await matchingHased(password , isUser.password)
    
    // throw 401 error for invalid credential
    if (!isPasswordMatched) {
      throw new HttpError(401, "Unauthorized", "Invalid credentials");
    }


    


  } catch (err) {
    if (err instanceof HttpError) {
      throw new HttpError(err.status, err.code, err.message);
    }
    if(err){
        throw new HttpError(500,'Internal server error',"An Unexpected error occcured")
    }
  }
};

export = { register, login };

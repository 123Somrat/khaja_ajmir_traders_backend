
import { TUser } from "../../models/user/userType";
import HttpError from "../../utils/customError";
import { matchingHased } from "../../utils/hashPassword";
import  tokenService  from "../token";
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


/**
 * 
 * @param { email and password }
 * @returns {user and jwtToken}
 */
const login = async ({email , password}: { email: string; password: string })=> {
  try {
    const isUser = await userService.user(email);

    if (!isUser) {
      throw new HttpError(404, "Not Found", "No user found");
    }

    const isPasswordMatched = await matchingHased(password , isUser.password)
    
    // throw 401 error for invalid credential
    if (!isPasswordMatched) {
       const res = await isUser.incrementFaildLogin()
      throw new HttpError(401, "Unauthorized", "Invalid credentials");
    }

   const  token = await tokenService.generateToken({name:isUser.name,email:isUser.email,role:isUser.role as string})
     
    return { isUser , token }
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

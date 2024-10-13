import asyncHandeler from "../utils/asyncHandeler";
import tokenService from "../lib/token";
import HttpError from "../utils/customError";


const authenticationMiddleWare = asyncHandeler(async (req, res, next) => {
  // Collect the token from cookie
  const token = req.headers.cookie?.split("=")[1] as string;


  if (!token) {
    throw new HttpError(401, "Unauthorized", "Acess denied");
  }

  const verifyToken = await tokenService.verifyToken(token);
   
  if (!verifyToken) {
    throw new HttpError(401, "Unauthorized", "Acess denied");
  }

  if (verifyToken) {
    req.body.user = verifyToken;
    next();
  }
});

export default authenticationMiddleWare;

import bcrypt from "bcrypt";
import { preprocess } from "zod";
import HttpError from "./customError";

/**
 *
 * @param password
 * @returns hashedPassword
 */
const generateHash = async (password: string) => {
  const salt = Number(process.env.BCRYPT_SALTROUNDS);
  try {
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param plainPass
 * @param hasedPassword
 * @returns true if user exeist itherwise throw 401 error
 */
const matchingHased = async (plainPass: string, hasedPassword: string) => {
  try {
    // comapre password
    const isMatched = await bcrypt.compare(plainPass, hasedPassword);

    // throw 401 error for invalid credential
    if (!isMatched) {
      throw new HttpError(401, "Unauthorized", "Invalid credentials");
    }

    return isMatched;
  } catch (err) {
    if (err instanceof HttpError) {
      throw new HttpError(err.status, err.code, err.message);
    }
  }
};

export { generateHash, matchingHased };

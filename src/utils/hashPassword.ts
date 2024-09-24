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

    return isMatched;
  } catch (err) {
    console.log(err);
  }
};

export { generateHash, matchingHased };

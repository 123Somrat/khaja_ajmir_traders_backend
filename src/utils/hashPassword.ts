import bcrypt from "bcrypt";
import { preprocess } from "zod";

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

export { generateHash };

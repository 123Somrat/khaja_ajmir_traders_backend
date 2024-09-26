import jwt from "jsonwebtoken";

/**
 *
 * @param paylode
 * @returns token
 */
const generateToken = async (paylode: {
  name: string;
  email: string;
  role: string;
}) => {
  const secretKey = process.env.JWT_SECRET as string;
  const options = { expiresIn: 10000 };

  const token = jwt.sign(paylode, secretKey, options);

  return token;
};

const verifyToken = async (token: string) => {
  const isVarified = await jwt.decode(token);

  return isVarified;
};

export = { generateToken, verifyToken };

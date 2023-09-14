import { User } from "../models/userModel";
import { DecodedToken } from "../types";
import { verifyToken } from "../utils/token";

const dotenv = require("dotenv");
dotenv.config();

export const isAuth = async (req: any, _res: any, next: any) => {
  const token: string = req.headers.authorization?.replace("Bearer", "");
  if (!token) {
    return next(new Error("Unauthorized. No token"));
  }

  try {
    const decoded: DecodedToken = verifyToken(token) as DecodedToken;
    if (decoded) {
      req.user = await User.findById(decoded.id);
      next();
    }
  } catch (error) {
    return next(error);
  }
};

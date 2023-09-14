import { User } from "../models/userModel";
//import { DecodedToken } from "../types";
import { verifyToken } from "../utils/token";

const dotenv = require("dotenv");
dotenv.config();

export const isAuth = async (req: any, _res: any, next: any) => {
  const token: string = req.headers.authorization?.replace("Bearer", "");
  if (!token) {
    return next(new Error("Unauthorized. No token"));
  }

  const decoded: any = verifyToken(token);
  req.user = await User.findOne({ email: decoded.email });
  console.log("--------REQ.USER", req.user);
};

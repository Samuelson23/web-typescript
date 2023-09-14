import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { isAuth } from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", getAllUser);
userRoutes.post("/register", registerUser);
userRoutes.get("/forgotPassword", changePassword);
userRoutes.delete("/deleteUser", deleteUser);
userRoutes.post("/login", loginUser);

export default userRoutes;

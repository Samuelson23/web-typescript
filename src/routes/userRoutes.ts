import express from "express";
import {
  changePassword,
  getAllUser,
  registerUser,
} from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/", getAllUser);
userRoutes.post("/register", registerUser);
userRoutes.get("/forgotPassword", changePassword);

export default userRoutes;

import express from "express";
import { getAllUser, registerUser } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/", getAllUser);
userRoutes.post("/register", registerUser);

export default userRoutes;

import express from "express";
import { getAllUser, register } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/", getAllUser);
userRoutes.post("/register", register);

export default userRoutes;
register;

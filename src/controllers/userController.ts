import { User } from "../models/userModel";
import { checkRequestRegister } from "../utils/checkRequest";

export const registerUser = async (req: any, res: any, next: any) => {
  console.log("entro register user");
  console.log(req.body);
  try {
    const validRequestRegister = checkRequestRegister(req.body);
    const newUser = new User(validRequestRegister);
    try {
      const savedUser = await newUser.save();

      console.log("NEW USER", newUser);
      if (savedUser) {
        return res.status(200).json(validRequestRegister);
      } else {
        return res.status(404).json("Error al crear el usuario. Try again");
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

export const getAllUser = async (_req: any, res: any, next: any) => {
  console.log("entro get all users");
  try {
    const allUsers = await User.find();
    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(200).json("No se ha encontrado ningun usuario");
    }
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (_req:any, res:any, next:any) => {
  
}

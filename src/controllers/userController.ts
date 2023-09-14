import { User } from "../models/userModel";
import { checkRequestRegister } from "../utils/checkRequest";
import { randomPassword } from "../utils/randomPass";
import { sendMail } from "../utils/sendMail";
import { generateToken, verifyToken } from "../utils/token";
const bcrypt = require("bcrypt");

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

export const loginUser = async (req: any, res: any, _next: any) => {
  const { email, password } = req.body;
  const userToLogin = await User.findOne({ email });

  if (userToLogin) {
    //console.log("usertoLogin", userToLogin);
    const comparePass = bcrypt.compareSync(password, userToLogin.password);
    if (comparePass) {
      const newToken: string = generateToken(userToLogin.id, userToLogin.email);
      return res.status(200).json({
        text: "login correcto",
        token: newToken,
        user: userToLogin,
      });
    } else {
      return res.status(404).json("contraseña incorrecta");
    }
  } else {
    return res.status(404).json("Email introducido incorrecto");
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

export const deleteUser = async (req: any, _res: any, _next: any) => {
  console.log("user from token", req.user);
  const decodedToken = verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDIwNTlmNmM2ZTc3YzJiZGM0ZjgyNCIsImVtYWlsIjoic2FtdWVsYmFja2VuZEBnbWFpbC5jb20iLCJpYXQiOjE2OTQ3MDcyNTksImV4cCI6MTY5NDc5MzY1OX0.GzAmQ1st-QNRvxq2qoU4RA6blC0FmUwlQLMO8MgyXxQ"
  );
  console.log("DECODED-------", decodedToken);
};

export const updateUser = async (_req: any, _res: any, _next: any) => {};

export const changePassword = async (req: any, res: any, _next: any) => {
  const { email } = req.body;

  const userPassword = await User.findOne({ email });

  if (userPassword) {
    const newPassword = randomPassword();
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    const newPassUser = await userPassword.updateOne({
      password: encryptedPassword,
    });

    if (newPassUser) {
      sendMail(email, newPassword, res, _next);
      return res.status(200).json({
        change: "ok",
        password: `your new password is: ${newPassword}`,
      });
    }
  }
};

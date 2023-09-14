import jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config();

export const generateToken = (id: string, email: string): string => {
  if (!id || !email) {
    throw new Error("No se ha encontrado ni el ID ni el email");
  }
  if (process.env.JWT_SECRET) {
    const userToken = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("token", userToken);
    return userToken;
  } else {
    throw new Error("Problema con la JWT-key");
  }
};

export const verifyToken = (token: string) => {
  if (!token) {
    throw new Error("No existe el token");
  }
  if (process.env.JWT_SECRET) {
    return jwt.verify(token, process.env.JWT_SECRET);
  } else {
    throw new Error("Problema con la JWT-key");
  }
};

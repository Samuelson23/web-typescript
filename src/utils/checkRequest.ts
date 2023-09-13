import { UserInterface } from "../types";

const checkString = (stringFromRequest: any): string => {
  if (typeof stringFromRequest !== "string") {
    throw new Error("Valor introducido no es un string");
  }
  return stringFromRequest;
};

const checkGender = (genderFromRequest: any) => {
  /* if (genderFromRequest !== "male" || genderFromRequest !== "female") {
    throw new Error("gender mal puesto");
  } */
  return genderFromRequest;
};

const checkEmail = (emailFromRequest: any): string => {
  if (typeof emailFromRequest !== "string") {
    throw new Error("email mal introducido");
  }
  return emailFromRequest;
};
const checkPassword = (passwordFromRequest: any): string => {
  if (typeof passwordFromRequest !== "string") {
    throw new Error("password mal introducida");
  }
  return passwordFromRequest;
};

export const checkRequestRegister = (req: any): UserInterface => {
  const { name, lastName, gender, email, password } = req;

  const newBody: UserInterface = {
    name: checkString(name),
    lastName: checkString(lastName),
    gender: checkGender(gender),
    email: checkEmail(email),
    password: checkPassword(password),
  };

  return newBody;
};

import { UserInterface } from "../types";

//!Comprobamos que el string del nombre y apellido no incluya ningun numero
const checkString = (stringFromRequest: any): string => {
  console.log(stringFromRequest);
  const noValid = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  noValid.forEach((num) => {
    console.log(num);
    if (stringFromRequest.includes(num)) {
      throw new Error("El nombre no puede contener un numero");
    }
  });
  return stringFromRequest;
};

//!Las comprobaciones del email y la contraseña las realiza VALIDATOR, y el genero es un enum de 2 opciones
export const checkRequestRegister = (req: any): UserInterface => {
  const { name, lastName, gender, email, password } = req;

  const newBody: UserInterface = {
    name: checkString(name),
    lastName: checkString(lastName),
    gender: gender,
    email: email,
    password: password,
  };

  return newBody;
};

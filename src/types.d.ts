export type CheckPassword = string | number;
export type Email = `${string}@${string}.${string}`;

export interface UserInterface {
  name: string;
  lastName: string;
  gender: "male" | "female";
  age?: number;
  mobile?: number;
  city?: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}

export interface EventInterface {
  name: string;
  location: string;
  description: string;
}

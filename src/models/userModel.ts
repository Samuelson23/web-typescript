import { Schema, model } from "mongoose";
import { UserInterface } from "../types";
import validator from "validator";

const bcrypt = require("bcrypt");

const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    age: { type: Number },
    mobile: { type: Number },
    city: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "email mal introducido"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "min 8 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next: any) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
    next("Error hashing password, error");
  }
});

export const User = model<UserInterface>("User", UserSchema);

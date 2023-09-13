import { Schema, model } from "mongoose";
import { EventInterface } from "../types";

const EventSchema = new Schema<EventInterface>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Evento = model<EventInterface>("Evento", EventSchema);
module.exports = { Evento };

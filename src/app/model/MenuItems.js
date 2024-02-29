import { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    duration: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);

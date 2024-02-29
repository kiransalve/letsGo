import { Schema, model, models } from "mongoose";

const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    catImage: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = models?.Category || model("Category", CategoriesSchema);

import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    person: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    tourDate: {
      type: String,
      required: true,
    },
    tourTime: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);

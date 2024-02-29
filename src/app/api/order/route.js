// /api/menu-items/route.js
import mongoose from "mongoose";
import { Order } from "../../model/Order";
import { isAdmin } from "../auth/[...nextauth]/route";

mongoose.connect(process.env.MONGO_URL, {
  writeConcern: { w: 'majority', wtimeout: 0, provenance: 'clientSupplied' },
});


export const POST = async (req) => {
    const data = await req.json();
    const orderDoc = await Order.create(data);
    console.log(orderDoc)
    return Response.json(orderDoc)
};

export const GET = async (req) => {
  if (await isAdmin()) {
    return Response.json(await Order.find());
  } else {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (userId) {
      const order = await Order.find({ userId });
      return Response.json(order);
    } else {
      return Response.json([]);
    }
  }
};

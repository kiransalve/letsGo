// /api/menu-items/route.js
import mongoose from "mongoose";
import { MenuItem } from "../../model/MenuItems";

mongoose.connect(process.env.MONGO_URL);

export const POST = async (req) => {
  const data = await req.json();
  const { name, desc, price, base64Image } = data;
  console.log();
  try {
    const menuItemDoc = await MenuItem.create({
      name,
      desc,
      price,
      base64Image,
    });
    return Response.json(menuItemDoc);
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error saving item", { status: 500 });
  }
};

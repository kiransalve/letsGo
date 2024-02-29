// /api/menu-items/route.js
import mongoose from "mongoose";
import { MenuItem } from "../../model/MenuItems";

mongoose.connect(process.env.MONGO_URL);

export const POST = async (req) => {
  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
};

export const PUT = async (req) => {
  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);
  return Response.json(true);
};

export const GET = async () => {
  return Response.json(await MenuItem.find());
};

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await MenuItem.deleteOne({ _id });
  return Response.json(true);
}

import mongoose from "mongoose";
import { Category } from "../../model/Category";

mongoose.connect(process.env.MONGO_URL);
export const POST = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const categoryDoc = await Category.create(data);
  return Response.json(categoryDoc);
};

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name, catImage, subTitle, title } = await req.json();
  console.log(name, catImage, subTitle, title);
  await Category.updateOne({ _id }, { name, catImage, subTitle, title });
  return Response.json(true);
}

export async function GET() {
  const category = await Category.find();
  return Response.json(category);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await Category.deleteOne({ _id });
  return Response.json(true);
}

// src\app\api\profile\route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "../../model/User";
import mongoose from "mongoose";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { _id } = data;

  let filter = {};

  if (_id) {
    filter = { _id };
    await User.updateOne({ _id }, data);
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    filter = { email };
  }
  await User.updateOne(filter, data);
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const userInfo = await User.findOne({ email });
  return Response.json(userInfo);
}

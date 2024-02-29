import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../../model/User";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 charecter");
    return false;
  }
  const notHashedpassword = pass;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(notHashedpassword, salt);
  body.password = hashedPassword;
  const createuser = await User.create(body);
  return Response.json(createuser);
}

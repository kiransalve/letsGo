import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../model/User";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeHolder: "test@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        mongoose.connect(process.env.MONGO_URL);
        try {
          const user = await User.findOne({ email });
          const passwordOk =
            user && bcrypt.compareSync(password, user.password);
          console.log(passwordOk, "this is in auth that password not matched");
          if (passwordOk) {
            return user;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await User.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

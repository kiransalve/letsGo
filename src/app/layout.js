import Header from "./components/layout/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import AppContext from "./AppContext";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Let'sGo",
  description: "Your guide for traveling!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="">
          <AppContext>
            <Toaster position="top-center" />
            <Header />
            {children}
          </AppContext>
        </main>
      </body>
    </html>
  );
}

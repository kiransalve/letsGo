"use client";
import { signOut, useSession } from "next-auth/react";
import { FaRegUser, FaPlaneDeparture, FaSearch } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getsearchVal } from "../../../store/tours";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { UserProfile } from "./UserProfile";

const Header = () => {
  const searchValue = useSelector((state) => state.tours.searchVal);
  const session = useSession();
  const status = session.status;
  console.log(status)
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTourList = pathname === "/tours";
  const {data} = UserProfile()

  
  const searchBar = isHome || isTourList;
  
  const homeStyles =
    "bg-gradient-to-b from-gray-900 via-gray-800 to-transparent";

  const handleSearch = () => {
    router.push("/tours");
  };
  const handleLogout = async () =>{
    await signOut();    
    router.push("/login");
  }

  return (
    <header
      className={`z-10 w-full fixed top-0 ${isHome ? homeStyles : "bg-white"}`}
    >
      <div className="py-4 px-1">
        <div className="flex items-center justify-between md:max-w-5xl w-full md:mx-auto ">
          <Link
            href="/"
            className={`${
              isHome ? "text-white" : "text-slate-600"
            } md:text-4xl font-bold text-2xl`}
          >
            Let&apos;sGo
          </Link>
          {searchBar && (
            <div className={`bg-white p-1 rounded-2xl border max-w-sm`}>
              <div className="flex items-center">
                <div className="ml-1">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="text-sm ml-2 focus:outline-none md:w-full w-[7rem] md:placeholder:text-[13px] placeholder:text-[9px]
                  "
                  onChange={(e) => dispatch(getsearchVal(e.target.value))}
                  value={searchValue}
                />
                <button
                  className="bg-blue-500 cursor-pointer p-2 rounded-2xl md:block hidden text-white text-sm"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Link href="/tours" className="flex flex-col items-center gap-2">
              <FaPlaneDeparture
                className={`${
                  isHome ? "text-white" : "text-slate-600"
                } text-sm`}
              />
              <div
                className={`${
                  isHome ? "text-white" : "text-slate-600"
                } text-sm hidden md:block `}
              >
                Tours
              </div>
            </Link>
            {status === "authenticated" && (
              <>
                <Link
                  href="/order"
                  className="flex flex-col items-center gap-2"
                >
                  <LuShoppingCart
                    className={`${
                      isHome ? "text-white" : "text-slate-600"
                    } text-sm`}
                  />
                  <div
                    className={`${
                      isHome ? "text-white" : "text-slate-600"
                    } text-sm hidden md:block`}
                  >
                    Order
                  </div>
                </Link>
                <Link
                  className="flex flex-col items-center gap-2"
                  href="/profile"
                >
                  <FaRegUser
                    className={`${
                      isHome ? "text-white" : "text-slate-600"
                    } text-sm`}
                  />
                  <div
                    className={`${
                      isHome ? "text-white" : "text-slate-600"
                    } text-sm hidden md:block`}
                  >
                    Profile
                  </div>
                </Link>
                <div
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={handleLogout}
               >
                  <IoIosLogOut
                    className={`${
                      isHome ? "text-white" : "text-slate-600"
                    } text-sm`}
                  />
                  <div
                    className={`${
                      isHome ? "text-white" : "text-slate-600"
                    } text-sm hidden md:block`}
                  >
                    Logout
                  </div>
                </div>
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <Link
                  className="flex flex-col items-center gap-2"
                  href="/login"
                >
                  <FaRegUser
                    className={`${
                      isHome ? "text-white" : "text-slate-600"
                    } text-sm`}
                  />
                  <div
                    className={`${
                      isHome ? "text-white" : "text-slate-600"
                    } text-sm hidden md:block`}
                  >
                    Login
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

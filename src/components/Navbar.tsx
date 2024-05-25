"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideSignal, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const { status } = useSession();

  return (
    <header className="bg-gradient-to-t from-[#a6c1ee] to-[#fbc2eb] p-6">
      <nav className="flex justify-between items-center w-[92%] m-auto">
        <div>
          <Link href="/">
            <Image
              className="w-24 h-12 cursor-pointer"
              src="/logo.jpg"
              alt="Logo"
              width={180}
              height={90}
              objectFit="fit"
            />
          </Link>
        </div>
        <div
          className={`duration-500 md:static absolute  md:bg-transparent md:min-h-fit min-h-[30vh] left-0 ${
            menuOpen
              ? " p-10 top-[0%] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] "
              : "top-[-100%] "
          } md:w-auto w-full flex items-center px-5`}
        >
          <div className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 ">
            <div
              onClick={toggleMenu}
              className="text-3xl cursor-pointer absolute right-10 md:hidden"
            >
              <X />
            </div>
            <div className="hover:underline font-semibold">
              <Link href="/">Home</Link>
            </div>
            <div className="hover:underline font-semibold">
              <Link href="/addNewProperty">Add Property</Link>
            </div>
            <div className="hover:underline font-semibold">
              <Link href="/viewProperty">View Property</Link>
            </div>
            <div className="hover:underline font-semibold">
              <Link href="/myProperty">My Property</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {status == "authenticated" && (
            
              <Button className="rounded-md bg-blue-500" onClick={()=>signOut({ callbackUrl: '/', redirect:true })}>Sign out</Button>
              
           
          )}
          {status == "unauthenticated" && (
            <Link href="/auth/login" passHref>
              <Button className="rounded-md bg-blue-500">Sign in</Button>
            </Link>
          )}
          <div
            onClick={toggleMenu}
            className="text-3xl cursor-pointer md:hidden"
          >
            <Menu />
            {/* {!menuOpen && <Menu />} */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

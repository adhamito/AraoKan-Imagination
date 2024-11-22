"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constant";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobilNav = () => {
  const pathname = usePathname();

  return (
    <header className="header flex justify-between items-center px-4 py-2">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSwitchSessionUrl="/" />

          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={102}
                  height={23}
                  className="cursor-pointer mb-4"
                />
                <ul className="header-nav_elements flex flex-col gap-2">
                  {navLinks.slice(0, 6).map((link) => {
                    const isActive = pathname.startsWith(link.route);

                    return (
                      <li
                        key={link.route}
                        className={`${
                          isActive ? "gradient-text" : ""
                        } p-18 flex whitespace-nowrap text-dark-700`}
                      >
                        <Link
                          className="sidebar-link flex items-center gap-2 cursor-pointer"
                          href={link.route}
                        >
                          <Image
                            src={link.icon}
                            alt="icon"
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobilNav;

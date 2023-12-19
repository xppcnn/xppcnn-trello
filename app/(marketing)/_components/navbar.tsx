import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 px-4 w-full h-14 flex items-center bg-white border-b shadow-sm">
      <div className="md:max-w-screen-2xl w-full flex justify-between items-center mx-auto">
        <Logo />
        <div className="md:block md:w-auto w-full flex items-center justify-between space-x-4">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

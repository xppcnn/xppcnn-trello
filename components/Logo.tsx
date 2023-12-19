import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden md:flex items-center gap-x-2 hover:opacity-70 transition">
        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
        <p className={"text-lg text-neutral-700 pb-1"}>Taskify</p>
      </div>
    </Link>
  );
};

export default Logo;

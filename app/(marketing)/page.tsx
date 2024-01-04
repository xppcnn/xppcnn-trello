import React from "react";
import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/font/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: false,
});
const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center p-4 border text-amber-700 shadow-md bg-amber-100 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          Team tools
        </div>
        <h1
          className={cn(
            "mb-6 text-3xl md:text-6xl text-center text-neutral-800",
            headingFont.className
          )}
        >
          Team Treasure Trove
        </h1>
        <div className="text-2xl md:text-4xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white p-4 pt-2 rounded-md w-fit">
          Team tools all in one.
        </div>

        <div
          className={cn(
            "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
            textFont.className
          )}
        >
          Team collaboration has never been this simple! Team Treasure Trove
          provides your team with an all-in-one collaboration tool, making your
          team a highly efficient and seamlessly coordinated workforce. Our
          product is designed to help you tackle various challenges in your
          daily team collaboration, ensuring that your team operates more
          efficiently and with impeccable organization.
        </div>
        <Button variant="default" asChild className="mt-6" size="lg">
          <Link href="/sign-up">Get for free</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;

import { Board } from "@prisma/client";
import React from "react";
import TitleForm from "./TitleForm";

const BoardNavBar = ({ data }: { data: Board }) => {
  return (
    <div className="h-14 w-full z-[50] fixed top-14 flex items-center px-6 gap-x-4 bg-black/40 text-white">
      <TitleForm data={data} />
    </div>
  );
};

export default BoardNavBar;

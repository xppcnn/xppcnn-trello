import { Board } from "@prisma/client";
import React from "react";
import TitleForm from "./TitleForm";
import BoardOptions from "./BoardOptions";

const BoardNavBar = ({ data }: { data: Board }) => {
  return (
    <div className="h-14 w-full z-[50] fixed top-14 flex items-center justify-between px-6 gap-x-4 bg-black/40 text-white">
      <TitleForm data={data} />
      <BoardOptions id={data.id} />
    </div>
  );
};

export default BoardNavBar;

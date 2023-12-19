import React from "react";
import { auth } from "@clerk/nextjs";
import BoardForm from "./form";
import prisma from "@/lib/prisma";
const OrgPage = async () => {
  const { userId, orgId } = await auth();
  const boards = await prisma.board.findMany();
  return (
    <div>
      <BoardForm />
      {boards.map((board) => (
        <div key={board.id}>{board.title}</div>
      ))}
    </div>
  );
};

export default OrgPage;

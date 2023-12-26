import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ListContainer from "./_components/ListContainer";
interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }
  const list = await prisma.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId: orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          title: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer id={params.boardId} data={list} />
    </div>
  );
};

export default BoardIdPage;

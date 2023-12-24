import { auth } from "@clerk/nextjs";
import React, { cache } from "react";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import BoardNavBar from "./_components/BoardNavBar";

const getBoard = cache((boardId: string) =>
  prisma.board.findUnique({
    where: {
      id: boardId,
    },
  })
);

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await getBoard(params.boardId);
  return {
    title: board?.title,
  };
}
const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }
  const board = await getBoard(params.boardId);
  if (!board) {
    return notFound();
  }
  return (
    <div
      className="relative h-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavBar data={board} />
      <main className="relative p-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;

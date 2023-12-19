"use server";

import { createSafeAction } from "@/lib/createSafeAction";
import { createBoardSchema } from "./schema";
import { createBoardReturnType, createBoardType } from "./types";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const createBoardHandler = async (
  data: createBoardType
): Promise<createBoardReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { title } = data;
  try {
    const board = await prisma.board.create({
      data: {
        title,
      },
    });
    revalidatePath(`/board/${board.id}`);
    return {
      data: board,
    };
  } catch (error) {
    return {
      error: "创建失败",
    };
  }
};

export const createBoard = createSafeAction(
  createBoardSchema,
  createBoardHandler
);

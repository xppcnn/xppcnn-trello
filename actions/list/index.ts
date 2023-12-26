"use server";
import { auth } from "@clerk/nextjs";
import {
  createListReturnType,
  createListType,
  updateListReturnType,
  updateListType,
} from "./types";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { createListSchema, updateListSchema } from "./schema";
const createListHandler = async (
  data: createListType
): Promise<createListReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }

  const { title, boardId } = data;
  let list;
  try {
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "看板不存在",
      };
    }

    const lastList = await prisma.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prisma.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (error) {
    return {
      error: "系统错误",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

const updateListHandler = async (
  data: updateListType
): Promise<updateListReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  let list;
  const { id, boardId, title } = data;
  try {
    list = await prisma.list.update({
      where: {
        id,
        boardId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: error as string,
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const createList = createSafeAction(createListSchema, createListHandler);

export const updateList = createSafeAction(updateListSchema, updateListHandler);
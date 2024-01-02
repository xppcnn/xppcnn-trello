"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import {
  createCardReturnType,
  createCardType,
  reorderCardReturnType,
  reorderCardType,
  updateCardReturnType,
  updateCardType,
} from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import {
  createCardSchema,
  reorderCardSchema,
  updateCardSchema,
} from "./schema";

const createCardHandler = async (
  data: createCardType
): Promise<createCardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { title, boardId, listId } = data;
  let card;
  try {
    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });
    if (!list) {
      return {
        error: "任务列表不存在",
      };
    }

    const lastCard = await prisma.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await prisma.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
  } catch (error) {
    console.log("🚀 ~ file: index.ts:51 ~ error:", error);
    return {
      error: "任务卡片创建失败",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};

const reorderCardHandler = async (
  data: reorderCardType
): Promise<reorderCardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { boardId, items } = data;
  let cards;
  try {
    const transaction = items.map((item) =>
      prisma.card.update({
        where: {
          id: item.id,
        },
        data: {
          order: item.order,
          listId: item.listId,
        },
      })
    );
    cards = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "卡片排序失败",
    };
  }
  return {
    data: cards,
  };
};

const updateCardHandler = async (
  data: updateCardType
): Promise<updateCardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { boardId, id, ...values } = data;
  let card;
  try {
    card = await prisma.card.update({
      where: {
        id: id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
  } catch (error) {
    return {
      error: "任务卡片更新失败",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};

export const createCard = createSafeAction(createCardSchema, createCardHandler);

export const reorderCard = createSafeAction(
  reorderCardSchema,
  reorderCardHandler
);
export const updateCard = createSafeAction(updateCardSchema, updateCardHandler);

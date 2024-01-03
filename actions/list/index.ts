"use server";
import { auth } from "@clerk/nextjs";
import {
  copyListReturnType,
  copyListType,
  createListReturnType,
  createListType,
  reorderListReturnType,
  reorderListType,
  updateListReturnType,
  updateListType,
} from "./types";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import {
  copyListSchema,
  createListSchema,
  reorderListSchema,
  updateListSchema,
} from "./schema";
import createAuditLog from "@/lib/createAuditLog";
import { ENTITY_TYPE, ACTION } from "prisma/prisma-client";
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

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
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
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
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

const copyListHandler = async (
  data: copyListType
): Promise<copyListReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { id, boardId } = data;
  const list = await prisma.list.findUnique({
    where: {
      id,
      boardId,
    },
    include: {
      cards: true,
    },
  });
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

  const copyList = await prisma.list.create({
    data: {
      title: `${list?.title}-Copy`,
      boardId: boardId,
      order: newOrder,
      cards: {
        createMany: {
          data:
            list?.cards.map((card) => ({
              title: card.title,
              description: card.title,
              order: card.order,
            })) || [],
        },
      },
    },
  });
  await createAuditLog({
    entityId: copyList.id,
    entityTitle: copyList.title,
    entityType: ENTITY_TYPE.LIST,
    action: ACTION.UPDATE,
  });
  revalidatePath(`/board/${boardId}`);
  return {
    data: copyList,
  };
};

const deleteListHandler = async (
  data: copyListType
): Promise<copyListReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { id, boardId } = data;
  try {
    const list = await prisma.list.delete({
      where: {
        id,
        boardId,
      },
    });
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "删除失败",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: null,
  };
};

const reorderListHandler = async (
  data: reorderListType
): Promise<reorderListReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { boardId, items } = data;
  let lists;
  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          id: list.id,
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "列表排序错误",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: lists,
  };
};

export const createList = createSafeAction(createListSchema, createListHandler);

export const updateList = createSafeAction(updateListSchema, updateListHandler);

export const copyList = createSafeAction(copyListSchema, copyListHandler);

export const deleteList = createSafeAction(copyListSchema, deleteListHandler);

export const reorderList = createSafeAction(
  reorderListSchema,
  reorderListHandler
);

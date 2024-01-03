"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import {
  copyCardReturnType,
  copyCardType,
  createCardReturnType,
  createCardType,
  deleteCardReturnType,
  deleteCardType,
  reorderCardReturnType,
  reorderCardType,
  updateCardReturnType,
  updateCardType,
} from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import {
  copyCardSchema,
  createCardSchema,
  deleteCardSchema,
  reorderCardSchema,
  updateCardSchema,
} from "./schema";
import createAuditLog from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "prisma/prisma-client";

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

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
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
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
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

const deleteCardHandler = async (
  data: deleteCardType
): Promise<deleteCardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { boardId, id } = data;
  let card;
  try {
    card = await prisma.card.delete({
      where: {
        id: id,
      },
    });
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "任务卡片删除失败",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};

const copyCardHandler = async (
  data: copyCardType
): Promise<copyCardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const { boardId, id } = data;
  let card;
  try {
    const curCard = await prisma.card.findUnique({
      where: {
        id: id,
      },
      include: {
        list: true,
      },
    });
    if (!curCard) {
      return {
        error: "任务卡片不存在",
      };
    }
    const lastCard = await prisma.card.findFirst({
      where: {
        listId: curCard?.listId,
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
        title: `${curCard.title}-copy`,
        description: curCard.description,
        listId: curCard.listId,
        order: newOrder,
      },
    });
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "任务卡片复制失败",
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

export const deleteCard = createSafeAction(deleteCardSchema, deleteCardHandler);

export const copyCard = createSafeAction(copyCardSchema, copyCardHandler);

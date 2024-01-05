"use server";

import { createSafeAction } from "@/lib/createSafeAction";
import {
  createBoardSchema,
  deleteBoardSchema,
  updateBoardSchema,
} from "./schema";
import {
  createBoardReturnType,
  createBoardType,
  deleteBoardReturnType,
  deleteBoardType,
  updateBoardReturnType,
  updateBoardType,
} from "./types";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import createAuditLog from "@/lib/createAuditLog";
import { ENTITY_TYPE, ACTION } from "prisma/prisma-client";
import { canAdd, decreaseCount, increaseCount } from "@/lib/orgLimit";

const createBoardHandler = async (
  data: createBoardType
): Promise<createBoardReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }

  const canCreate = await canAdd();
  if (!canCreate) {
    return {
      error: "看板创建数量已达上限，请升级套餐",
    };
  }
  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: "缺失文件，无法创建新的看板。",
    };
  }
  try {
    const board = await prisma.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });

    await increaseCount();
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
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

const updateBoardHandler = async (
  data: updateBoardType
): Promise<updateBoardReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }

  const { title, id } = data;

  try {
    const updateBoard = await prisma.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityId: updateBoard.id,
      entityTitle: updateBoard.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });
    revalidatePath(`/board/${id}`);
    return {
      data: updateBoard,
    };
  } catch (error) {
    return {
      error: "系统错误,请稍后再试！",
    };
  }
};

const deleteBoardHandler = async (
  data: deleteBoardType
): Promise<deleteBoardReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }

  const { id } = data;

  try {
    const board = await prisma.board.delete({
      where: {
        id,
        orgId,
      },
    });
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "系统错误,请稍后再试！",
    };
  }
  await decreaseCount();
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const createBoard = createSafeAction(
  createBoardSchema,
  createBoardHandler
);

export const updateBoard = createSafeAction(
  updateBoardSchema,
  updateBoardHandler
);

export const deleteBoard = createSafeAction(
  deleteBoardSchema,
  deleteBoardHandler
);

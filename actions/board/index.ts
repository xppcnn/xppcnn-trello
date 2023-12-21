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
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "UnAuthorized",
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

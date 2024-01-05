import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export const increaseCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("UnAuthorized");
  }
  const limitList = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (limitList) {
    await prisma.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: limitList.count + 1,
      },
    });
  } else {
    await prisma.orgLimit.create({
      data: {
        count: 1,
        orgId,
      },
    });
  }
};

export const decreaseCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("UnAuthorized");
  }
  const limitList = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (limitList) {
    await prisma.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: limitList.count > 1 ? limitList.count - 1 : 0,
      },
    });
  } else {
    await prisma.orgLimit.create({
      data: {
        count: 1,
        orgId,
      },
    });
  }
};

export const canAdd = async (): Promise<boolean> => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: { orgId },
  });
  return !orgLimit || orgLimit.count < 5;
};

export const getAvailableCount = async (): Promise<number> => {
  const { orgId } = auth();
  if (!orgId) {
    return 0;
  }
  const orgLimit = await prisma.orgLimit.findUnique({
    where: { orgId },
  });
  return orgLimit?.count || 0;
};

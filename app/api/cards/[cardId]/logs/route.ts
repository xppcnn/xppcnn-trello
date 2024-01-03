import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ENTITY_TYPE } from "prisma/prisma-client";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
    const auditLogs = await prisma.auditLog.findMany({
      where: {
        entityId: params.cardId,
        orgId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createTime: "desc",
      },
      take: 5,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("服务器错误", { status: 500 });
  }
}

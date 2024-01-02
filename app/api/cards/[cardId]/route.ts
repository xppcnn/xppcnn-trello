import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return new NextResponse("UnAuthorized", { status: 401 });
  }

  try {
    const card = await prisma.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });
    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Server Error", { status: 500 });
  }
}

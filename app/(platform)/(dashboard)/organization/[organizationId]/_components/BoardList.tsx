import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { HelpCircle, User2 } from "lucide-react";
import Hint from "@/components/Hint";
import FormPopover from "@/components/form/FormPopover";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/board";
import { getAvailableCount } from "@/lib/orgLimit";
import checkSubscription from "@/lib/subscription";
const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const boards = await prisma?.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createTime: "desc",
    },
  });
  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();
  return (
    <div className="space-y-4">
      <div className="flex items-centertext-lg font-semibold text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        你的看板
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="aspect-video relative group bg-no-repeat bg-center bg-cover rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
            <p className="relative text-white font-semibold">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right" align="start">
          <div
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            role="button"
          >
            <p className="text-sm">创建</p>
            <span className="text-xs">
              {isPro ? "暂无限制" : `剩余${MAX_FREE_BOARDS - availableCount}个`}
            </span>
            <Hint
              description={`免费用户可以创建${MAX_FREE_BOARDS}个看板，超出限制请升级套餐`}
              sideOffset={40}
            >
              <HelpCircle className="absolute bottom-2 right-2 w-[14px] h-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="h-full w-full rounded-sm p-2 aspect-video"></Skeleton>
      <Skeleton className="h-full w-full rounded-sm p-2 aspect-video"></Skeleton>
      <Skeleton className="h-full w-full rounded-sm p-2 aspect-video"></Skeleton>
      <Skeleton className="h-full w-full rounded-sm p-2 aspect-video"></Skeleton>
      <Skeleton className="h-full w-full rounded-sm p-2 aspect-video"></Skeleton>
      <Skeleton className="h-full w-full rounded-sm p-2 aspect-video"></Skeleton>
      <Skeleton className="h-full w-full rounded-sm p-2 aspect-video"></Skeleton>
      <Skeleton className="h-full w-full rounded-sm p-2 aspect-video"></Skeleton>
    </div>
  );
};

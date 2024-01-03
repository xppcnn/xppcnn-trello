import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ActivityItem from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
const ActivityList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await prisma.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createTime: "desc",
    },
  });
  if (auditLogs.length === 0) {
    return (
      <div className="mt-4 text-neutral-200 text-sm flex justify-center">
        暂无数据
      </div>
    );
  }
  return (
    <ol className="space-y-4 mt-4">
      {auditLogs.map((log) => (
        <ActivityItem data={log} key={log.id} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivitySkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};
export default ActivityList;

import ActivityItem from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityIcon } from "lucide-react";
import { AuditLog } from "prisma/prisma-client";
import React from "react";

interface ActivityProps {
  list: AuditLog[];
}

const Activity = ({ list }: ActivityProps) => {
  return (
    <div className="flex justify-start w-full gap-x-2">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="text-neutral-700 font-semibold mb-2">活动</p>
        <ol className="mt-2 space-y-4">
          {list.map((ele) => (
            <ActivityItem key={ele.id} data={ele} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex justify-start w-full gap-x-2">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};

export default Activity;

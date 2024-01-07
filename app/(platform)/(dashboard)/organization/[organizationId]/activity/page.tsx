import React, { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import Info from "../_components/Info";
import ActivityList from "./_components/ActivityList";
import checkSubscription from "@/lib/subscription";

const ActivityPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;

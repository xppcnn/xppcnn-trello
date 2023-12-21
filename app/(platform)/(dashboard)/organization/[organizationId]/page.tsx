import React, { Suspense } from "react";
import Info from "./_components/Info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/BoardList";
const OrgPage = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <Suspense fallback={<BoardList.Skeleton />  }>
        <BoardList />
      </Suspense>
    </div>
  );
};

export default OrgPage;

"use client";
import React from "react";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
const Info = () => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt=""
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-lg">{organization?.name}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          免费
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center text-sm text-muted-foreground">
          <Skeleton className="h-3 w-3 mr-1" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
    </div>
  );
};

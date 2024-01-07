"use client";
import { stripeRedirect } from "@/actions/stripeRedirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import useProModal from "@/hooks/useProModal";
import React from "react";
import { toast } from "sonner";

interface Props {
  isPro: boolean;
}
const SubscriptionButton = ({ isPro }: Props) => {
  const onOpen = useProModal((state) => state.onOpen);
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data;
    },
    onError(error) {
      toast.error(error);
    },
  });
  const handleClick = () => {
    if (isPro) {
      execute({});
    } else {
      onOpen();
    }
  };
  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isPro ? "管理订阅" : "升级"}
    </Button>
  );
};

export default SubscriptionButton;

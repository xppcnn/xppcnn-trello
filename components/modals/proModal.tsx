import React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useProModal from "@/hooks/useProModal";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/actions/stripeRedirect";
import { toast } from "sonner";

const ProModal = () => {
  const isOpen = useProModal((state) => state.isOpen);
  const onClose = useProModal((state) => state.onClose);
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleClick = () => {
    execute({});
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image alt="" src="/logo_full.png" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">请升级套餐</h2>
          <p className="text-xs font-semibold text-neutral-600">
            更好的使用 Team Treasure Trove
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>看板数量不受限制</li>
              <li>高级功能</li>
              <li>管理和安全功能</li>
              <li>更多功能敬请期待</li>
            </ul>
          </div>
          <Button
            variant="default"
            className="w-full"
            onClick={handleClick}
            disabled={isLoading}
          >
            升级
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;

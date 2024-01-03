"use client";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import useCardModal from "@/hooks/useCardModal";
import { deleteCard, copyCard } from "@/actions/card";
import { CardWithList } from "@/types";

interface ActionProps {
  data: CardWithList;
}
const Action = ({ data }: ActionProps) => {
  const onClose = useCardModal((state) => state.onClose);
  const params = useParams();
  const { execute: deleteExecute, isLoading: deleteLoading } = useAction(
    deleteCard,
    {
      onSuccess: () => {
        toast.success("删除成功");
        onClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );
  const { execute: copyExecute, isLoading: copyLoading } = useAction(copyCard, {
    onSuccess: () => {
      toast.success("复制成功");
      onClose();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = () => {
    const boardId = params.boardId as string;
    deleteExecute({ id: data.id, boardId });
  };

  const onCopy = () => {
    const boardId = params.boardId as string;
    copyExecute({ id: data.id, boardId });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">操作</p>
      <Button
        className="w-full justify-start"
        variant="gray"
        disabled={copyLoading}
        onClick={onCopy}
      >
        <Copy className="h-4 w-4 mr-2" />
        复制
      </Button>
      <Button
        className="w-full justify-start"
        variant="gray"
        onClick={onDelete}
        disabled={deleteLoading}
      >
        <Trash className="h-4 w-4 mr-2" />
        删除
      </Button>
    </div>
  );
};

Action.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-2 bg-neutral-200" />
      <Skeleton className="w-full h-4 bg-neutral-200" />
      <Skeleton className="w-full h-4 bg-neutral-200" />
    </div>
  );
};
export default Action;

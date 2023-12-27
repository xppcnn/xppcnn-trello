"use client";
import React, { ElementRef, useRef } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { List } from "prisma/prisma-client";
import { Separator } from "@/components/ui/separator";
import FormSubmit from "@/components/form/FormSubmit";
import { useAction } from "@/hooks/useAction";
import { copyList, deleteList } from "@/actions/list";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  addCard: () => void;
}
const ListOptions = ({ data, addCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute: copyExecute } = useAction(copyList, {
    onSuccess: (data) => {
      closeRef.current?.click();
      toast.success("复制成功!");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const { execute: deleteExecute } = useAction(deleteList, {
    onSuccess: (data) => {
      closeRef.current?.click();
      toast.success("删除成功!");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const handleCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    copyExecute({ id, boardId });
  };

  const handleDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    deleteExecute({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto    " variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <PopoverClose asChild ref={closeRef}>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          操作
        </div>
        <Button
          variant="ghost"
          className="text-neutral-600 w-full items-center justify-start rounded-none py-2 px-5"
        >
          新增
        </Button>
        <form action={handleCopy}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="text-neutral-600 w-full items-center justify-start rounded-none py-2 px-5"
          >
            复制
          </FormSubmit>
        </form>
        <Separator />
        <form action={handleDelete}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="text-neutral-600 w-full items-center justify-start rounded-none py-2 px-5"
          >
            删除
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;

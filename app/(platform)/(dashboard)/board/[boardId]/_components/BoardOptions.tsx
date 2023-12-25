"use client";
import React from "react";
import { MoreHorizontal, X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { deleteBoard } from "@/actions/board";

const BoardOptions = ({ id }: { id: string }) => {
  const { execute, isLoading } = useAction(deleteBoard);
  const handleDelete = () => {
    execute({ id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          操作
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          className="h-auto w-full rounded-none py-2 px-5 justify-start text-sm font-normal"
          onClick={handleDelete}
          disabled={isLoading}
        >
          删除
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;

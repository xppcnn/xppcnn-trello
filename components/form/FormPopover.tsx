"use client";
import React, { ElementRef, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/board";
import { toast } from "sonner";
import FormPicker from "./FormPicker";
import { useRouter } from "next/navigation";
import useProModal from "@/hooks/useProModal";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}
const FormPopover = ({
  children,
  side = "bottom",
  align = "center",
  sideOffset = 0,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const onOpen = useProModal((state) => state.onOpen);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      toast.success("创建成功");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError(error) {
      toast.error(error);
      onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-80 pt-3"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          创建看板
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={onSubmit}>
          <FormPicker id="image" errors={fieldErrors} />
          <FormInput id="title" label="名称" errors={fieldErrors} />

          <FormSubmit className="w-full">创建</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;

"use client";
import React, { ElementRef, useState, useRef } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";
import ListWrapper from "./ListWrapper";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormSubmit from "@/components/form/FormSubmit";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/list";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ListFormProps {
  boardId: string;
}
const ListForm = ({ boardId }: ListFormProps) => {
  const router = useRouter();
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: () => {
      toast.success("创建成功");
      cancelAdd();
      router.refresh();
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleAdd = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const cancelAdd = () => {
    setIsEditing(false);
  };

  const keyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      cancelAdd();
    }
  };

  useOnClickOutside(formRef, cancelAdd);
  useEventListener("keydown", keyDown);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({ title, boardId });
  };
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          className="w-full p-3  rounded-md bg-white space-y-4 shadow-sm"
          ref={formRef}
          action={onSubmit}
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="请输入"
            errors={fieldErrors}
          />
          <input hidden value={boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>新增</FormSubmit>
            <Button onClick={cancelAdd} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <Button
        className="w-full bg-white/80 hover:bg-white/50 rounded-md transition p-3 font-medium text-sm text-black"
        onClick={handleAdd}
      >
        <Plus className="h-4 w-4 mr-2" />
        新增
      </Button>
    </ListWrapper>
  );
};

export default ListForm;

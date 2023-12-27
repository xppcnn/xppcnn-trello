"use client";
import React, { ElementRef, useRef, useState } from "react";
import { List } from "@prisma/client";
import FormInput from "@/components/form/FormInput";
import { useEventListener } from "usehooks-ts";
import { useAction } from "@/hooks/useAction";
import { updateList } from "@/actions/list";
import { toast } from "sonner";
import ListOptions from "./ListOptions";

interface ListHeaderProps {
  data: List;
}
const ListHeader = ({ data }: ListHeaderProps) => {
  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success("编辑成功");
      setTitle(data.title);
      disableEditing();
    },
  });
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };
  const keyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", keyDown);

  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };
  const handleSubmit = (formData: FormData) => {
    const newTitle = formData.get("title") as string;
    if (title === newTitle) {
      disableEditing();
      return;
    }
    execute({ id: data.id, boardId: data.boardId, title: newTitle });
  };

  const addCard = () => {};
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between gap-x-2">
      {isEditing ? (
        <form className="px-[2px]" ref={formRef} action={handleSubmit}>
          <FormInput
            id="title"
            onBlur={handleBlur}
            ref={inputRef}
            defaultValue={title}
            placeholder="请输入"
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
        </form>
      ) : (
        <div
          className="w-full text-sm px-3  py-1 h-7 font-medium border-transparent"
          onClick={enableEditing}
        >
          {title}
        </div>
      )}
      <ListOptions data={data} addCard={addCard} />
    </div>
  );
};

export default ListHeader;

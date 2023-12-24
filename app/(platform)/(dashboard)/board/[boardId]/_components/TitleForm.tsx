"use client";
import React, { useState, useRef, ElementRef, useTransition } from "react";
import { Board } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";
import { useAction } from "@/hooks/useAction";
import { updateBoard } from "@/actions/board";
import { toast } from "sonner";
const TitleForm = ({ data }: { data: Board }) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success("编辑成功");
      setIsEditing(false);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title, id: data.id });
  };
  if (isEditing) {
    return (
      <form
        className="flex items-center gap-x-2"
        ref={formRef}
        action={handleSubmit}
      >
        <FormInput
          ref={inputRef}
          id="title"
          defaultValue={title}
          onBlur={handleBlur}
          className="text-lg font-bold px-[10px] py-1 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={handleClick}
      className="bg-transparent hover:bg-white/20 text-white font-bold text-lg py-1 px-2"
    >
      {title}
    </Button>
  );
};

export default TitleForm;

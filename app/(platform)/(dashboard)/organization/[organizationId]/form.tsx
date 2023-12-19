"use client";
import React from "react";
import { createBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
const BoardForm = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => console.log(data),
  });
  console.log("🚀 ~ file: form.tsx:8 ~ BoardForm ~ fieldErrors:", fieldErrors);
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <input id="title" name="title"></input>
      <Button>确定</Button>
    </form>
  );
};

export default BoardForm;

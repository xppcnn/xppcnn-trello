"use client";
import React from "react";
import { createBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
const BoardForm = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => console.log(data),
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <form action={onSubmit} className="space-y-2">
      <FormInput id="title" errors={fieldErrors} label="标题"></FormInput>
      <FormSubmit>确定</FormSubmit>
    </form>
  );
};

export default BoardForm;

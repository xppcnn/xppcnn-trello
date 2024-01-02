"use client";
import React, { ElementRef, useRef, useState } from "react";
import { Layout } from "lucide-react";
import FormInput from "@/components/form/FormInput";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/actions/card";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useCardModal from "@/hooks/useCardModal";

interface HeaderProps {
  data: CardWithList;
}

const Header = ({ data }: HeaderProps) => {
  const onClose = useCardModal((state) => state.onClose);
  const [title, setTitle] = useState(data.title);
  const queryClient = useQueryClient();
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const { execute } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      toast.success(`修改成功`);
      setTitle(data.title);
      onClose();
    },
  });
  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({
      title,
      id: data.id,
      boardId: params.boardId as string,
      description: null,
    });
  };
  return (
    <div className="flex justify-start space-x-3">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={handleSubmit} ref={formRef}>
          <FormInput
            id="title"
            onBlur={handleBlur}
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent 
            border-transparent relative -left-1 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          属于<span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex justify-start space-x-3">
      <Skeleton className="h-6 w-6 mt-1 text-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
export default Header;

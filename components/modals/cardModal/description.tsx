"use client";
import { ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import FormTextArea from "@/components/form/FormTextArea";
import FormSubmit from "@/components/form/FormSubmit";
import { Button } from "@/components/ui/button";
import { updateCard } from "@/actions/card";
import { useAction } from "@/hooks/useAction";
import useCardModal from "@/hooks/useCardModal";
import { CardWithList } from "@/types";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardWithList;
}
const Description = ({ data }: DescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const onClose = useCardModal((state) => state.onClose);
  const params = useParams();
  const queryClient = useQueryClient();
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      queryClient.invalidateQueries({ queryKey: ["card-audit-log", data.id] });
      toast.success(`修改成功`);
      onClose();
    },
    onError(error) {
      toast.success(error);
    },
  });

  const handleAdd = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const handleSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;
    execute({ description, boardId, id: data.id });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const keyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  useEventListener("keydown", keyDown);
  useOnClickOutside(formRef, handleCancel);
  return (
    <div className="flex justify-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">描述</p>
        {isEditing ? (
          <form ref={formRef} className="space-y-2" action={handleSubmit}>
            <FormTextArea
              ref={textAreaRef}
              id="description"
              placeholder="请填写描述"
              defaultValue={data.description || undefined}
              className="w-full mt-2"
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>保存</FormSubmit>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                取消
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={handleAdd}
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description || "添加描述"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex justify-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};

import React, {
  ElementRef,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";
import { Plus, X } from "lucide-react";
import { List } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FormTextArea from "@/components/form/FormTextArea";
import FormSubmit from "@/components/form/FormSubmit";
import { useAction } from "@/hooks/useAction";
import { createCard } from "@/actions/card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import FormErrors from "@/components/form/FormErrors";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  data: List;
}
const CardForm = ({ data }: CardFormProps) => {
  const params = useParams();
  const { execute, fieldErrors, reset } = useAction(createCard, {
    onSuccess: () => {
      toast.success("创建成功");
      disableEditing();
    },
    onError(error) {
      toast.error(error);
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
    reset();
  };

  const keyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", keyDown);

  const textAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };
  const onSubmit = (formData: FormData) => {
    const listId = formData.get("listId") as string;
    const title = formData.get("title") as string;
    execute({ listId, title, boardId: params.boardId as string });
  };
  if (isEditing) {
    return (
      <form className="m-1 px-1 py-1 space-y-4" action={onSubmit} ref={formRef}>
        <FormTextArea
          id="title"
          ref={textRef}
          placeholder="请输入任务卡名称"
          errors={fieldErrors}
          onKeyDown={textAreaKeyDown}
        />
        <input hidden id="listId" name="listId" value={data.id} />
        <div className="flex items-center">
          <FormSubmit>新增卡片</FormSubmit>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="h-4 w-h ml-4" />
          </Button>
        </div>
      </form>
    );
  }
  return (
    <div className="px-2 pt-2">
      <Button
        size="sm"
        variant="ghost"
        className="h-auto w-full px-2 py-1.5 justify-start text-sm text-muted-foreground"
        onClick={enableEditing}
      >
        <Plus className="h-4 w-4 mr-2" />
        新增任务卡
      </Button>
    </div>
  );
};

export default CardForm;

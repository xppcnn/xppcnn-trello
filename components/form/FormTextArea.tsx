"use client";
import React, { KeyboardEventHandler, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FormErrors from "./FormErrors";
import { cn } from "@/lib/utils";

interface FormTextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | null> | null;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
}
const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor="id"
              className="text-sm font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            ref={ref}
            defaultValue={defaultValue}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

export default FormTextArea;

FormTextArea.displayName = "FormTextArea";

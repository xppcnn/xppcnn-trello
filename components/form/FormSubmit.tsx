"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;

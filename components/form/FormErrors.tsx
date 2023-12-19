import { XCircle } from "lucide-react";
import React from "react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) {
    return null;
  }
  return (
    <div id={`${id}-error`} className="mt-2 text-xs text-rose-500">
      {errors?.[id]?.map((error) => (
        <div
          key={error}
          className="flex items-center font-medium p-2 border border-rose-500 rounded-sm"
        >
          <XCircle className="h-4 x-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;

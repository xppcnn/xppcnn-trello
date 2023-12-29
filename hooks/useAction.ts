import { useCallback, useState } from "react";
import { ActionState, FieldErrors } from "@/lib/createSafeAction";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options?: UseActionOptions<TOutput>
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }

        setFieldErrors(result.fieldErrors || null);
        if (result.error) {
          setError(result.error);
          options?.onError?.(result.error);
        }
        if (result.data) {
          setData(result.data);
          options?.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options?.onComplete?.();
      }
    },
    [action, options]
  );
  const reset = useCallback(() => {
    setData(null);
    setIsLoading(false);
    setError(null);
    setFieldErrors(null);
  }, []);
  return {
    execute,
    error,
    data,
    fieldErrors,
    isLoading,
    reset,
  };
};

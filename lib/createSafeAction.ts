import { z } from "zod";
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput> | null;
  error?: string | null;
  data?: TOutput | null;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
      return {
        fieldErrors: validatedData.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validatedData.data);
  };
};

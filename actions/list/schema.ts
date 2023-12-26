import { z } from "zod";

export const createListSchema = z.object({
  title: z
    .string({
      required_error: "请输入标题",
      invalid_type_error: "请输入标题",
    })
    .min(3, {
      message: "不得少于三个字符",
    }),
  boardId: z.string(),
});

export const updateListSchema = z.object({
  title: z
    .string({
      required_error: "请输入标题",
      invalid_type_error: "请输入标题",
    })
    .min(3, {
      message: "不得少于三个字符",
    }),
  boardId: z.string(),
  id: z.string(),
});

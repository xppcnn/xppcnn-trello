import { z } from "zod";

export const createCardSchema = z.object({
  title: z
    .string({
      invalid_type_error: "请输入标题",
      required_error: "请输入标题",
    })
    .min(3, {
      message: "标题不得少于三个字符",
    }),
  boardId: z.string(),
  listId: z.string(),
});

export const updateCardSchema = z.object({
  title: z.optional(
    z
      .string({
        invalid_type_error: "请输入标题",
        required_error: "请输入标题",
      })
      .min(3, {
        message: "标题不得少于三个字符",
      })
  ),
  description: z.optional(
    z
      .string({
        invalid_type_error: "请输入描述",
        required_error: "请输入描述",
      })
      .min(3, { message: "描述不得少于三个字字符" })
  ),
  boardId: z.string(),
  id: z.string(),
});

export const reorderCardSchema = z.object({
  items: z
    .object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createTime: z.date(),
      updateTime: z.date(),
    })
    .array(),
  boardId: z.string(),
});

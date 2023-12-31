import { List } from "lucide-react";
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

export const copyListSchema = z.object({
  boardId: z.string(),
  id: z.string(),
});

export const deleteListSchema = z.object({
  boardId: z.string(),
  id: z.string(),
});

export const reorderListSchema = z.object({
  boardId: z.string(),
  items: z
    .object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createTime: z.date(),
      updateTime: z.date(),
    })
    .array(),
});

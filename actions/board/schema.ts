import { z } from "zod";

export const createBoardSchema = z.object({
  title: z
    .string({
      required_error: "请填写标题",
      invalid_type_error: "请填写标题",
    })
    .min(3, { message: "不得少于三个字符" }),
  image: z.string({
    required_error: "请选择图片",
    invalid_type_error: "请选择图片",
  }),
});

export const updateBoardSchema = z.object({
  title: z
    .string({
      required_error: "请填写标题",
      invalid_type_error: "请填写标题",
    })
    .min(3, { message: "不得少于三个字符" }),
  id: z.string(),
});

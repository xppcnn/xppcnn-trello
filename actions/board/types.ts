import { z } from "zod";
import {
  createBoardSchema,
  deleteBoardSchema,
  updateBoardSchema,
} from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { Board } from "@prisma/client";

export type createBoardType = z.infer<typeof createBoardSchema>;
export type createBoardReturnType = ActionState<createBoardType, Board>;

export type updateBoardType = z.infer<typeof updateBoardSchema>;
export type updateBoardReturnType = ActionState<updateBoardType, Board>;

export type deleteBoardType = z.infer<typeof deleteBoardSchema>;
export type deleteBoardReturnType = ActionState<deleteBoardType, Board>;

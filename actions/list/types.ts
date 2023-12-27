import { z } from "zod";
import {
  copyListSchema,
  createListSchema,
  deleteListSchema,
  updateListSchema,
} from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { List } from "@prisma/client";

export type createListType = z.infer<typeof createListSchema>;
export type createListReturnType = ActionState<createListType, List>;

export type updateListType = z.infer<typeof updateListSchema>;
export type updateListReturnType = ActionState<updateListType, List>;

export type copyListType = z.infer<typeof copyListSchema>;
export type copyListReturnType = ActionState<copyListType, List>;

export type deleteListType = z.infer<typeof deleteListSchema>;
export type deleteListReturnType = ActionState<copyListType, List>;

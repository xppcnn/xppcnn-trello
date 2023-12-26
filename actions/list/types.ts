import { z } from "zod";
import { createListSchema, updateListSchema } from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { List } from "@prisma/client";

export type createListType = z.infer<typeof createListSchema>;
export type createListReturnType = ActionState<createListType, List>;

export type updateListType = z.infer<typeof updateListSchema>;
export type updateListReturnType = ActionState<updateListType, List>;

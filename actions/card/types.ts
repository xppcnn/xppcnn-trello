import { z } from "zod";
import {
  createCardSchema,
  reorderCardSchema,
  updateCardSchema,
} from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { Card } from "prisma/prisma-client";

export type createCardType = z.infer<typeof createCardSchema>;
export type createCardReturnType = ActionState<createCardType, Card>;

export type reorderCardType = z.infer<typeof reorderCardSchema>;
export type reorderCardReturnType = ActionState<reorderCardType, Card[]>;

export type updateCardType = z.infer<typeof updateCardSchema>;
export type updateCardReturnType = ActionState<updateCardType, Card>;

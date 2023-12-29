import { z } from "zod";
import { createCardSchema, reorderCardSchema } from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { Card } from "prisma/prisma-client";

export type createCardType = z.infer<typeof createCardSchema>;
export type createCardReturnType = ActionState<createCardType, Card>;

export type reorderCardType = z.infer<typeof reorderCardSchema>;
export type reorderCardReturnType = ActionState<reorderCardType, Card[]>;

import { z } from "zod";
import { createBoardSchema } from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { Board } from "@prisma/client";

export type createBoardType = z.infer<typeof createBoardSchema>;
export type createBoardReturnType = ActionState<createBoardType, Board>;

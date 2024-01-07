import { z } from "zod";
import { stripeRedirectSchema } from "./schema";
import { ActionState } from "@/lib/createSafeAction";

export type stripeRedirectType = z.infer<typeof stripeRedirectSchema>;

export type stripeRedirectReturnType = ActionState<stripeRedirectType, string>;

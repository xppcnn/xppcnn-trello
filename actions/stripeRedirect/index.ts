"use server";
import { auth, currentUser } from "@clerk/nextjs";
import { stripeRedirectReturnType, stripeRedirectType } from "./types";
import prisma from "@/lib/prisma";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { stripeRedirectSchema } from "./schema";

const stripeRedirectHandler = async (
  data: stripeRedirectType
): Promise<stripeRedirectReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!user || !userId || !orgId) {
    return {
      error: "UnAuthorized",
    };
  }
  const settingUrl = absoluteUrl(`/organization/${orgId}`);
  let url = "";
  try {
    const orgSubscription = await prisma.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });
    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingUrl,
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "3T Pro",
                description: "Team Treasure Trove 高级版",
              },
              unit_amount: 666,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: { orgId },
      });
      url = stripeSession.url || "";
    }
  } catch (error) {
    console.log("🚀 ~ file: index.ts:64 ~ error:", error);
    return {
      error: "升级失败，请重试",
    };
  }

  revalidatePath(`organization/${orgId}`);
  return {
    data: url,
  };
};

export const stripeRedirect = createSafeAction(
  stripeRedirectSchema,
  stripeRedirectHandler
);

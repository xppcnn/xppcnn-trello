import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const DAY_IN_MS = 86_400_000;

const checkSubscription = async (): Promise<boolean> => {
  const { orgId } = auth();
  if (!orgId) {
    return false;
  }
  const orgSubscription = await prisma.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
  return !!isValid;
};

export default checkSubscription;

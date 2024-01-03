import { auth, currentUser } from "@clerk/nextjs";
import { ENTITY_TYPE, ACTION } from "@prisma/client";
import prisma from "@/lib/prisma";

interface Params {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

const createAuditLog = async (params: Params) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();
    if (!user || !orgId) {
      throw new Error("该用户不存在");
    }

    const { entityId, entityTitle, entityType, action } = params;

    await prisma.auditLog.create({
      data: {
        orgId,
        action,
        entityId,
        entityTitle,
        entityType,
        userId: user.id,
        userImage: user.imageUrl,
        userName: user?.firstName + "" + user?.lastName,
      },
    });
  } catch (error) {
    console.error("[AUDIT_ERROR]:" + error);
  }
};

export default createAuditLog;

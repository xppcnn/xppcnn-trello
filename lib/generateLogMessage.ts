import { ACTION, AuditLog } from "@prisma/client";

const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `新增 ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `更新 ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `删除 ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `未知操作 ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};

export default generateLogMessage;

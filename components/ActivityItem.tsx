import { Avatar, AvatarImage } from "@/components/ui/avatar";
import generateLogMessage from "@/lib/generateLogMessage";
import { DateFormat } from "@/lib/utils";
import { AuditLog } from "prisma/prisma-client";


interface ActivityItemProps {
    data: AuditLog;
  }
const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage src={data.userImage} alt="avatar" />
      </Avatar>
      <div className="flex flex-col space-y-1">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-neutral-700 mr-2">
            {data.userName}
          </span>
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {DateFormat(new Date(data.createTime))}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;

import { auth } from "@clerk/nextjs";
import React from "react";

const OrgPage = async () => {
  const { userId, orgId } = await auth();
  return (
    <div>
      OrgPage {userId} - {orgId}
    </div>
  );
};

export default OrgPage;

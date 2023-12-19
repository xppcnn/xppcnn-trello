import React from "react";
import { auth } from "@clerk/nextjs";
import BoardForm from "./form";

const OrgPage = async () => {
  const { userId, orgId } = await auth();

  return (
    <div>
      <BoardForm />
      OrgPage {userId} - {orgId}
    </div>
  );
};

export default OrgPage;

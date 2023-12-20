import React from "react";
import OrgControl from "./_components/OrgControl";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <OrgControl />
      {children}
    </div>
  );
};

export default OrganizationLayout;

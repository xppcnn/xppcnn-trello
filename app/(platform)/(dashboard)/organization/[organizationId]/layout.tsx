import React from "react";
import OrgControl from "./_components/OrgControl";
import { auth } from "@clerk/nextjs";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: orgSlug,
  };
}
const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <OrgControl />
      {children}
    </div>
  );
};

export default OrganizationLayout;

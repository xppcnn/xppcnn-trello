import React from "react";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="pt-20 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">{children}</main>;
};

export default OrganizationLayout;

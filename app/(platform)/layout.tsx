import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "sonner";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster  position="top-center"/>
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;

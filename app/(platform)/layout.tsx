import React from "react";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/components/providers/queryProvider";
import ModalProvider from "@/components/providers/modalProvider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster position="top-center" />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;

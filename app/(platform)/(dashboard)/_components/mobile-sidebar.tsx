"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useMobileSidebar from "@/hooks/use-mobile-sidebar";
import useHasMounted from "@/hooks/useHasMounted";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";

const MobileSidebar: React.FC = () => {
  const pathname = usePathname();
  const hasMounted = useHasMounted();
  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  useEffect(() => {
    onClose();
  }, [onClose, pathname]);
  if (!hasMounted) return null;
  return (
    <>
      <Button
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
        onClick={onOpen}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="mobile-sidebar-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;

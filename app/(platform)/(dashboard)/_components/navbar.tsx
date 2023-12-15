import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 bg-white h-14 px-4 z-50 w-full flex items-center border-b shadow-sm">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:block">
          <Logo />
        </div>
        <Button
          size="sm"
          className="rounded-sm hidden md:flex h-auto py-1 px-2"
        >
          新 建
        </Button>
        <Button size="sm" className="rounded-sm block md:hidden ">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-x-2 ml-auto">
        <OrganizationSwitcher
          hidePersonal
          afterLeaveOrganizationUrl="/select-org"
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;

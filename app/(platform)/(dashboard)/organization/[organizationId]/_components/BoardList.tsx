import Hint from "@/components/Hint";
import FormPopover from "@/components/form/FormPopover";
import { HelpCircle, User2 } from "lucide-react";
import React from "react";

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-centertext-lg font-semibold text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        你的看板
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover side="right" align="start">
          <div
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            role="button"
          >
            <p className="text-sm">创建</p>
            <span className="text-xs">剩余5个</span>
            <Hint
              description="免费用户可以创建五个看板，超出限制请升级套餐"
              sideOffset={40}
            >
              <HelpCircle className="absolute bottom-2 right-2 w-[14px] h-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;

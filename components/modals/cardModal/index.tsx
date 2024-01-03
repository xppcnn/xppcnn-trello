"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCardModal from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import Header from "./header";
import Description from "./description";
import Action from "./action";
import { AuditLog } from "prisma/prisma-client";
import Activity from "./activity";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditData } = useQuery<AuditLog[]>({
    queryKey: ["card-audit-log", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <Header data={cardData} /> : <Header.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {auditData ? (
                <Activity list={auditData} />
              ) : (
                <Activity.Skeleton />
              )}
            </div>
          </div>
          {cardData ? <Action data={cardData} /> : <Action.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;

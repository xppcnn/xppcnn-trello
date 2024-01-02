import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "prisma/prisma-client";
import useCardModal from "@/hooks/useCardModal";

interface CardItemProps {
  data: Card;
  index: number;
}
const CardItem = ({ data, index }: CardItemProps) => {
  const onOpen = useCardModal((state) => state.onOpen);
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="truncate border-2 border-transparent
     hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
          onClick={() => onOpen(data.id)}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;

import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import ListHeader from "./ListHeader";
import CardForm from "./CardForm";
import { ListWithCards } from "@/types";
import CardItem from "./CardItem";
import { cn } from "@/lib/utils";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}
const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader data={data} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem data={card} key={card.id} index={index} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm data={data} />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;

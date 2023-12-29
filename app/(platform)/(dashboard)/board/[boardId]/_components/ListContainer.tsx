"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
} from "@hello-pangea/dnd";
import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { useAction } from "@/hooks/useAction";
import { reorderList } from "@/actions/list";
import { toast } from "sonner";
import { reorderCard } from "@/actions/card";
interface ListContainerProps {
  data: ListWithCards[];
  id: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
const ListContainer = ({ data, id }: ListContainerProps) => {
  const [dataSource, setDataSource] = useState(data);
  const { execute: reorderListExecute } = useAction(reorderList, {
    onSuccess: (data) => {
      toast.success("列表更新成功");
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { execute: reorderCardExecute } = useAction(reorderCard, {
    onSuccess: (data) => {
      toast.success("任务卡片更新成功");
    },
    onError(error) {
      toast.error(error);
    },
  });
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(dataSource, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setDataSource(items);
      reorderListExecute({ boardId: id, items });
    }
    if (type === "card") {
      const newData = [...dataSource];
      const destinationList = newData.find(
        (ele) => ele.id === destination.droppableId
      ) || { cards: [] };
      // 同一列表移动
      if (destination.droppableId === source.droppableId) {
        const curCard = destinationList?.cards
          ? [...destinationList?.cards]
          : [];
        const newCard = reorder(curCard, source.index, destination.index).map(
          (item, index) => ({ ...item, order: index })
        );
        destinationList.cards = newCard;
        setDataSource(newData);
        reorderCardExecute({ boardId: id, items: newCard });
      } else {
        // 跨列表移动
        const sourceList = newData.find(
          (ele) => ele.id === source.droppableId
        ) || { cards: [] };

        const [item] = sourceList.cards.splice(source.index, 1);
        item.listId = destination.droppableId;
        destinationList.cards.splice(destination.index, 0, item);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        destinationList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        setDataSource(newData);
        reorderCardExecute({ boardId: id, items: destinationList.cards });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" direction="horizontal" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-3"
          >
            {dataSource.map((list, index) => {
              return <ListItem key={list.id} data={list} index={index} />;
            })}
            {provided.placeholder}
            <ListForm boardId={id} />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;

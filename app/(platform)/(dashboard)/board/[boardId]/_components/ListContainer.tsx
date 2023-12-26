"use client";
import React, { useEffect, useState } from "react";
import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
interface ListContainerProps {
  data: ListWithCards[];
  id: string;
}
const ListContainer = ({ data, id }: ListContainerProps) => {
  const [dataSource, setDataSource] = useState(data);

  useEffect(() => {
    setDataSource(data);
  }, [data]);
  return (
    <ol className="flex h-full gap-3">
      {dataSource.map((list, index) => {
        return <ListItem key={list.id} data={list} index={index} />;
      })}
      <ListForm boardId={id} />
    </ol>
  );
};

export default ListContainer;

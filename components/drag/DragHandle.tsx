// DragHandle.tsx
"use client";

import React, { useContext } from "react";
import { Button } from "antd";
import { HolderOutlined } from "@ant-design/icons";
import { SortableListItemContext } from "./DragSortableList";

export const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(
    SortableListItemContext
  );

  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
    />
  );
};

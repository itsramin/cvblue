// SortableListItem.tsx
"use client";

import React, { useMemo } from "react";
import { List } from "antd";
import { HolderOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableListItemContext } from "./DragSortableList";

interface SortableListItemProps {
  itemKey: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const SortableListItem: React.FC<SortableListItemProps> = ({
  itemKey,
  children,
  style,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey });

  const listStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const memoizedValue = useMemo(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes]
  );

  return (
    <SortableListItemContext.Provider value={memoizedValue}>
      <List.Item ref={setNodeRef} style={listStyle}>
        {children}
      </List.Item>
    </SortableListItemContext.Provider>
  );
};

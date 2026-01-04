// DragSortableList.tsx
"use client";

import React, { createContext, useContext, useMemo } from "react";
import { List } from "antd";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableListItem } from "./SortableListItem";
import type { DragEndEvent } from "@dnd-kit/core";

interface SortableListItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: any;
  attributes?: any;
}

export const SortableListItemContext =
  createContext<SortableListItemContextProps>({});

// Generic type with index signature
interface SortableItem {
  [key: string]: any;
  key: string | number;
}

interface DragSortableListProps<T extends SortableItem> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  itemKeyField?: string;
}

export function DragSortableList<T extends SortableItem>({
  items,
  renderItem,
  onDragEnd,
  itemKeyField = "key",
}: DragSortableListProps<T>) {
  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
      id="drag-sortable-list"
    >
      <SortableContext
        items={items.map((item) => item[itemKeyField])}
        strategy={verticalListSortingStrategy}
      >
        <List
          dataSource={items}
          renderItem={(item, index) => (
            <SortableListItem
              key={item[itemKeyField]}
              itemKey={item[itemKeyField]}
            >
              {renderItem(item, index)}
            </SortableListItem>
          )}
        />
      </SortableContext>
    </DndContext>
  );
}

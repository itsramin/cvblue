// EditableList.tsx
import React, { useState } from "react";
import { Input, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  HolderOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { EditableItem } from "@/type/type";
import { Text } from "./MyText";

interface EditableListProps {
  items: EditableItem[];
  onItemsChange: (items: EditableItem[]) => void;
  placeholder?: string;
  label?: string;
  canReorder?: boolean;
}

export default function EditableList({
  items,
  onItemsChange,
  placeholder = "Add an item...",
  label = "Items",
  canReorder = true,
}: EditableListProps) {
  const [newItem, setNewItem] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const addItem = () => {
    if (newItem.trim()) {
      const newItemObj: EditableItem = {
        id: `item-${Date.now()}`,
        content: newItem.trim(),
        isEditing: false,
      };
      onItemsChange([...items, newItemObj]);
      setNewItem("");
    }
  };

  const startEditItem = (id: string) => {
    onItemsChange(
      items.map((item) =>
        item.id === id
          ? { ...item, isEditing: true }
          : { ...item, isEditing: false }
      )
    );
  };

  const saveEditedItem = (id: string, newContent: string) => {
    if (newContent.trim()) {
      onItemsChange(
        items.map((item) =>
          item.id === id
            ? { ...item, content: newContent.trim(), isEditing: false }
            : item
        )
      );
    } else {
      removeItem(id);
    }
  };

  const cancelEditItem = (id: string) => {
    onItemsChange(
      items.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id));
  };

  // Reorder functions
  const moveItem = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);

    onItemsChange(newItems);
  };

  const moveItemUp = (index: number) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const moveItemDown = (index: number) => {
    if (index < items.length - 1) {
      moveItem(index, index + 1);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      moveItem(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const renderItem = (item: EditableItem, index: number) => {
    const isDragged = draggedIndex === index;
    const isDragOver = dragOverIndex === index;

    return (
      <div
        key={item.id}
        className={`flex items-center justify-between p-2 border rounded mb-2 bg-white hover:bg-gray-50 transition-all duration-200
          ${isDragged ? "opacity-50 border-dashed border-blue-500" : ""}
          ${
            isDragOver
              ? "border-solid border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
        draggable={canReorder}
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={() => handleDrop(index)}
        onDragEnd={handleDragEnd}
      >
        {item.isEditing ? (
          <div className="flex items-center w-full">
            {canReorder && (
              <div className="mr-2 cursor-move text-gray-400">
                <HolderOutlined />
              </div>
            )}
            <Input
              defaultValue={item.content}
              onPressEnter={(e) =>
                saveEditedItem(item.id, e.currentTarget.value)
              }
              onBlur={(e) => saveEditedItem(item.id, e.target.value)}
              autoFocus
              className="flex-1 mr-2"
            />
            <Space>
              <Button
                type="text"
                size="small"
                icon={<CheckOutlined />}
                onClick={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.parentElement
                    ?.previousElementSibling as HTMLInputElement;
                  if (input) saveEditedItem(item.id, input.value);
                }}
              />
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => cancelEditItem(item.id)}
              />
            </Space>
          </div>
        ) : (
          <>
            <div className="flex items-center flex-1">
              {canReorder && (
                <div className="mr-2 cursor-move text-gray-400 hover:text-gray-600">
                  <HolderOutlined />
                </div>
              )}
              <Text className="flex-1">{item.content}</Text>
            </div>
            <Space>
              {canReorder && (
                <>
                  <Button
                    type="text"
                    size="small"
                    icon={<UpOutlined />}
                    onClick={() => moveItemUp(index)}
                    disabled={index === 0}
                    title="Move up"
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<DownOutlined />}
                    onClick={() => moveItemDown(index)}
                    disabled={index === items.length - 1}
                    title="Move down"
                  />
                </>
              )}
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => startEditItem(item.id)}
                title="Edit"
              />
              <Button
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => removeItem(item.id)}
                title="Delete"
              />
            </Space>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="mb-4">
      <Text strong className="block mb-2">
        {label}
      </Text>
      <div className="mb-2">
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder={placeholder}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onPressEnter={addItem}
          />
          <Button type="primary" onClick={addItem} icon={<PlusOutlined />}>
            Add
          </Button>
        </Space.Compact>
      </div>

      {items.length > 0 && (
        <div className="mt-6 space-y-2">
          {items.map((item, index) => renderItem(item, index))}
        </div>
      )}
    </div>
  );
}

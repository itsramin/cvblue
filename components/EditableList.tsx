// EditableList.tsx
import React, { useState } from "react";
import { Input, Button, Space, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface EditableItem {
  id: string;
  content: string;
  isEditing: boolean;
}

interface EditableListProps {
  items: EditableItem[];
  onItemsChange: (items: EditableItem[]) => void;
  placeholder?: string;
  label?: string;
}

export default function EditableList({
  items,
  onItemsChange,
  placeholder = "Add an item...",
  label = "Items",
}: EditableListProps) {
  const [newItem, setNewItem] = useState("");

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

  const renderItem = (item: EditableItem) => (
    <div className="flex items-center justify-between p-2 border border-gray-200 rounded mb-2 bg-white hover:bg-gray-50">
      {item.isEditing ? (
        <div className="flex items-center w-full">
          <Input
            defaultValue={item.content}
            onPressEnter={(e) => saveEditedItem(item.id, e.currentTarget.value)}
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
          <Text className="flex-1">{item.content}</Text>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => startEditItem(item.id)}
            />
            <Button
              type="text"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => removeItem(item.id)}
            />
          </Space>
        </>
      )}
    </div>
  );

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
        <div className="mt-4 space-y-2">
          {items.map((item) => renderItem(item))}
        </div>
      )}
    </div>
  );
}

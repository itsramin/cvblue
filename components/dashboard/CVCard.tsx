import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Divider,
  Button,

  Dropdown,
  Input,
  Popconfirm,
} from "antd";
import {
  MoreOutlined,
  CheckOutlined,
  CalendarOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { MenuProps, message } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useData } from "@/store/store";
import { ICV } from "@/type/type";
import { Text } from "../UI/MyText";



interface CVCardProps {
  cv: ICV;
}

export default function CVCard({ cv }: CVCardProps) {
  const [editingCVId, setEditingCVId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const nav = useRouter();
  const { setActiveCV, duplicateCV, removeCV, updateCV } = useData();
  const [messageApi, contextHolder] = message.useMessage();

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDuplicateCV = () => {
    duplicateCV(cv.id);
    messageApi.success(`CV "${cv.name}" duplicated successfully`);
  };

  const handleDeleteCV = () => {
    removeCV(cv.id);
    messageApi.success(`CV "${cv.name}" deleted successfully`);
  };

  const startEditingCV = () => {
    setEditingCVId(cv.id);
    setEditingName(cv.name);
  };

  const saveCVName = () => {
    if (!editingName.trim()) {
      messageApi.warning("CV name cannot be empty");
      return;
    }

    updateCV(cv.id, { name: editingName });
    messageApi.success("CV name updated");
    setEditingCVId(null);
    setEditingName("");
  };

  const cancelEditing = () => {
    setEditingCVId(null);
    setEditingName("");
  };

  const getCVDropdownItems = (): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit Name",
      icon: <EditOutlined />,
      onClick: startEditingCV,
    },
    {
      key: "duplicate",
      label: "Duplicate",
      icon: <CopyOutlined />,
      onClick: handleDuplicateCV,
    },
    {
      key: "delete",
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Delete CV"
            description={`Are you sure you want to delete "${cv.name}"?`}
            onConfirm={handleDeleteCV}
            onCancel={(e) => e?.stopPropagation()}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <div style={{ width: "100%" }}>Delete</div>
          </Popconfirm>
        </div>
      ),
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  return (
    <Card>
      {/* CV Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            {editingCVId === cv.id ? (
              <Input
                size="small"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onPressEnter={saveCVName}
                onBlur={cancelEditing}
                autoFocus
                className="mb-1"
                suffix={
                  <CheckOutlined
                    className="cursor-pointer"
                    onClick={saveCVName}
                  />
                }
              />
            ) : (
              <Text strong className="block text-base truncate">
                {cv.name}
              </Text>
            )}
          </div>
        </div>

        <Dropdown
          menu={{ items: getCVDropdownItems() }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Dropdown>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-lg font-semibold text-gray-800">
            {cv.experiences.length}
          </div>
          <div className="text-xs text-gray-500">Experience</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-lg font-semibold text-gray-800">
            {cv.educations.length}
          </div>
          <div className="text-xs text-gray-500">Education</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-lg font-semibold text-gray-800">
            {cv.skills.length}
          </div>
          <div className="text-xs text-gray-500">Skills</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-lg font-semibold text-gray-800">
            {cv.projects.length}
          </div>
          <div className="text-xs text-gray-500">Projects</div>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Dates */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <CalendarOutlined className="text-xs" />
            <span>Created</span>
          </div>
          <Text className="text-gray-700">{formatDate(cv.createdAt)}</Text>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <EditOutlined className="text-xs" />
            <span>Updated</span>
          </div>
          <Text className="text-gray-700">{formatDate(cv.updatedAt)}</Text>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <Button
          type="primary"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            setActiveCV(cv.id);
            nav.push("/form");
          }}
        >
          Edit CV
        </Button>
      </div>
      {contextHolder}
    </Card>
  );
}

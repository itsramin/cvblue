"use client";

import { useData } from "@/store/store";
import {
  Dropdown,
  Button,
  Typography,
  Modal,
  Input,
  Card,
  message,
  Popconfirm,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import {
  PlusOutlined,
  CopyOutlined,
  DeleteOutlined,
  MoreOutlined,
  EditOutlined,
  CheckOutlined,
  FileTextOutlined,
  CalendarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;
const { Search } = Input;

export default function Dashboard() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [newCVName, setNewCVName] = useState("");
  const [editingCVId, setEditingCVId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const nav = useRouter();

  const {
    cvs,
    activeCVId,
    addCV,
    setActiveCV,
    removeCV,
    duplicateCV,
    updateCV,
  } = useData();

  const filteredCVs = cvs.filter((cv) =>
    cv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (cvs.length > 0 && !activeCVId) {
      setActiveCV(cvs[0].id);
    }
  }, [cvs, activeCVId, setActiveCV]);

  const handleAddCV = () => {
    if (!newCVName.trim()) {
      message.warning("Please enter a name for your CV");
      return;
    }

    const cvId = addCV({ name: newCVName });
    if (cvId) {
      message.success(`CV "${newCVName}" created successfully`);
      setNewCVName("");
      setIsCVModalOpen(false);
    }
  };

  const handleDuplicateCV = (cvId: string) => {
    const originalCV = cvs.find((cv) => cv.id === cvId);
    if (originalCV) {
      duplicateCV(cvId);
      message.success(`CV "${originalCV.name}" duplicated successfully`);
    }
  };

  const handleDeleteCV = (cvId: string) => {
    const cvToDelete = cvs.find((cv) => cv.id === cvId);
    if (cvToDelete) {
      removeCV(cvId);
      message.success(`CV "${cvToDelete.name}" deleted successfully`);
    }
  };

  const startEditingCV = (cvId: string, currentName: string) => {
    setEditingCVId(cvId);
    setEditingName(currentName);
  };

  const saveCVName = (cvId: string) => {
    if (!editingName.trim()) {
      message.warning("CV name cannot be empty");
      return;
    }

    updateCV(cvId, { name: editingName });
    message.success("CV name updated");
    setEditingCVId(null);
    setEditingName("");
  };

  const cancelEditing = () => {
    setEditingCVId(null);
    setEditingName("");
  };

  const getCVDropdownItems = (
    cvId: string,
    cvName: string
  ): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit Name",
      icon: <EditOutlined />,
      onClick: () => startEditingCV(cvId, cvName),
    },
    {
      key: "duplicate",
      label: "Duplicate",
      icon: <CopyOutlined />,
      onClick: () => handleDuplicateCV(cvId),
    },
    {
      key: "delete",
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Delete CV"
            description={`Are you sure you want to delete "${cvName}"?`}
            onConfirm={() => handleDeleteCV(cvId)}
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

  return (
    <>
      <div className=" ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <Title level={3} className="!mb-1 font-semibold">
                Dashboard CV Manager
              </Title>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Search
                placeholder="Search CVs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
                allowClear
                prefix={<SearchOutlined />}
              />

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsCVModalOpen(true)}
                className="whitespace-nowrap"
              >
                New CV
              </Button>
            </div>
          </div>
        </div>

        {/* CV List */}
        {filteredCVs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCVs.map((cv) => (
              <Card key={cv.id}>
                {/* CV Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      {editingCVId === cv.id ? (
                        <Input
                          size="small"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onPressEnter={() => saveCVName(cv.id)}
                          onBlur={cancelEditing}
                          autoFocus
                          className="mb-1"
                          suffix={
                            <CheckOutlined
                              className="text-green-500 cursor-pointer hover:text-green-600"
                              onClick={() => saveCVName(cv.id)}
                            />
                          }
                        />
                      ) : (
                        <>
                          <Text strong className="block text-base truncate">
                            {cv.name}
                          </Text>
                        </>
                      )}
                    </div>
                  </div>

                  <Dropdown
                    menu={{ items: getCVDropdownItems(cv.id, cv.name) }}
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
                    <Text className="text-gray-700">
                      {formatDate(cv.createdAt)}
                    </Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <EditOutlined className="text-xs" />
                      <span>Updated</span>
                    </div>
                    <Text className="text-gray-700">
                      {formatDate(cv.updatedAt)}
                    </Text>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  type={"primary"}
                  className="w-full mt-4"
                  onClick={() => {
                    setActiveCV(cv.id);
                    nav.push("/form");
                  }}
                >
                  Edit CV
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12 border-dashed border-2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileTextOutlined className="text-2xl text-gray-400" />
              </div>
              <Title level={4} className="!mb-2">
                {searchTerm ? "No CVs found" : "No CVs yet"}
              </Title>
              <Text type="secondary" className="mb-6 max-w-md">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Create your professional CV to showcase your skills and experience"}
              </Text>
              {!searchTerm && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsCVModalOpen(true)}
                  size="large"
                >
                  Create First CV
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Create New CV Modal */}
      <Modal
        title="Create New CV"
        open={isCVModalOpen}
        onOk={handleAddCV}
        onCancel={() => {
          setIsCVModalOpen(false);
          setNewCVName("");
        }}
        okText="Create"
        cancelText="Cancel"
      >
        <div className="my-6">
          <div className="mb-4">
            <Text strong className="block mb-2">
              CV Name
            </Text>
            <Input
              placeholder="e.g., Software Engineer Resume"
              value={newCVName}
              onChange={(e) => setNewCVName(e.target.value)}
              onPressEnter={handleAddCV}
              autoFocus
            />
          </div>
          <Text type="secondary">
            You can add experiences, education, skills, and projects after
            creating the CV.
          </Text>
        </div>
      </Modal>
    </>
  );
}

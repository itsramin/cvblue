import { useState } from "react";
import { Modal, Input, Typography, message } from "antd";
import { useData } from "@/store/store";

const { Text } = Typography;

interface CreateCVModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateCVModal({ open, onClose }: CreateCVModalProps) {
  const [newCVName, setNewCVName] = useState("");
  const { addCV } = useData();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddCV = () => {
    if (!newCVName.trim()) {
      messageApi.warning("Please enter a name for your CV");
      return;
    }

    const cvId = addCV({ name: newCVName });
    if (cvId) {
      messageApi.success(`CV "${newCVName}" created successfully`);
      setNewCVName("");
      onClose();
    }
  };

  return (
    <Modal
      title="Create New CV"
      open={open}
      onOk={handleAddCV}
      onCancel={() => {
        onClose();
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
      {contextHolder}
    </Modal>
  );
}

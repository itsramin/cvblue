"use client";

import { useData } from "@/store/store";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Card,
  Descriptions,
  Space,
  Modal,
  Skeleton,
  Empty,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Item } = Form;
const { TextArea } = Input;

export default function Certifications() {
  const {
    addCertification,
    certifications,
    removeCertification,
    updateCertification,
    hasHydrated,
  } = useData();
  const [status, setStatus] = useState<"new" | "edit" | "">("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();
  const [convertedData, setConvertedData] = useState<
    {
      key: number;
      title: string;
      id: string;
      data: { key: string; label: string; children: React.ReactNode }[];
    }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const sortedCertifications = [...certifications].sort((a, b) => {
      // Compare in descending order (newer first)
      return dayjs(b.date, "YYYY-MM").diff(dayjs(a.date, "YYYY-MM"));
    });

    const converted = sortedCertifications.map((e, index) => ({
      key: index,
      id: e.id,
      title: e.title,
      data: [
        {
          key: "title",
          label: "Title",
          children: e.title,
        },
        {
          key: "date",
          label: "Date",
          children: e.date,
        },
        {
          key: "url",
          label: "Link",
          children: e.url,
        },

        {
          key: "description",
          label: "Description",
          children: e.description,
          span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        },
      ],
    }));

    setConvertedData(converted);
  }, [certifications]);

  useEffect(() => {
    if (hasHydrated) {
      // Small delay to ensure everything is loaded
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [hasHydrated]);

  if (!hasHydrated || isLoading) {
    return <Skeleton />;
  }

  const submitHandler = (values: any) => {
    const newCer = {
      id: editingId || Date.now().toString(),
      title: values.title,
      url: values.url,
      description: values.description,
      date: values.date.format("YYYY-MM"),
    };

    if (status === "edit" && editingId) {
      updateCertification(editingId, newCer);
    } else {
      addCertification(newCer);
    }

    form.resetFields();
    setStatus("");
    setEditingId(null);
    setModalOpen(false);
  };

  const handleEdit = (id: string) => {
    const certification = certifications.find((cer) => cer.id === id);
    if (certification) {
      setEditingId(id);
      setStatus("edit");

      form.setFieldsValue({
        title: certification.title,
        url: certification.url,
        description: certification.description,
        date: certification.date ? dayjs(certification.date, "YYYY-MM") : null,
      });

      setModalOpen(true);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setStatus("");
    setEditingId(null);
    setModalOpen(false);
  };

  const handleNewCertification = () => {
    form.resetFields();
    setEditingId(null);
    setStatus("new");

    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-y-6">
      {convertedData.length > 0 ? (
        convertedData.map((item) => (
          <Card
            key={item.id}
            className="w-full"
            title={item.title}
            extra={
              <Space>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(item.id)}
                  size="small"
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    removeCertification(item.id);
                  }}
                />
              </Space>
            }
          >
            <Descriptions
              items={item.data}
              column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            />
          </Card>
        ))
      ) : (
        <Empty description="No Certifications added yet" />
      )}

      {/* Certification Form Modal */}
      <Modal
        title={
          status === "edit" ? "Edit Certification" : "Add New Certification"
        }
        open={modalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
          >
            {status === "edit" ? "Update" : "Save"}
          </Button>,
        ]}
        width={800}
      >
        <Form form={form} onFinish={submitHandler} layout="vertical">
          <Row gutter={[20, 16]}>
            {/* title */}
            <Col span={12}>
              <Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input placeholder="e.g., Bachelor of Science, Master of Arts, PhD" />
              </Item>
            </Col>

            {/* Date Fields */}
            <Col xs={24} sm={12} lg={8}>
              <Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Start date is required" }]}
              >
                <DatePicker
                  picker="month"
                  style={{ width: "100%" }}
                  placeholder="Select start month"
                  allowClear
                />
              </Item>
            </Col>

            {/* Link */}
            <Col span={24}>
              <Item
                name="url"
                label="Link"
                rules={[
                  {
                    required: false,
                    type: "url",
                  },
                ]}
              >
                <Input placeholder="e.g., https://www.corsera.com/..." />
              </Item>
            </Col>

            {/* Description */}
            <Col span={24}>
              <Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: false,
                    message: "Description is optional",
                  },
                ]}
              >
                <TextArea
                  placeholder="Describe briefly how you get it."
                  rows={4}
                  showCount
                  maxLength={500}
                />
              </Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* New Certification Button */}
      <Button
        icon={<PlusOutlined />}
        onClick={handleNewCertification}
        className="mx-auto"
        type="primary"
      >
        New Certification
      </Button>
    </div>
  );
}

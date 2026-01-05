"use client";

import { useData } from "@/store/store";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  DatePicker,
  Switch,
  Card,
  Descriptions,
  Space,
  Tag,
  InputNumber,
  Modal,
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

export default function Education() {
  const { addEducation, educations, removeEducation, updateEducation } =
    useData();
  const [status, setStatus] = useState<"new" | "edit" | "">("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [convertedData, setConvertedData] = useState<
    {
      key: number;
      title: string;
      id: string;
      data: { key: string; label: string; children: React.ReactNode }[];
    }[]
  >([]);
  const [isCurrent, setIsCurrent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Sort educations by date (newer first)
    const sortedEducations = [...educations].sort((a, b) => {
      // Handle current positions (ongoing) - they should be first
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;

      // For end dates, use endDate if available, otherwise use startDate
      const dateA = a.current ? a.startDate : a.endDate || a.startDate;
      const dateB = b.current ? b.startDate : b.endDate || b.startDate;

      // Compare in descending order (newer first)
      return dayjs(dateB, "YYYY-MM").diff(dayjs(dateA, "YYYY-MM"));
    });

    const converted = sortedEducations.map((e, index) => ({
      key: index,
      id: e.id,
      title: e.degree + " " + e.field + " " + e.institution,
      data: [
        {
          key: "degree",
          label: "Degree",
          children: e.degree,
        },
        {
          key: "institution",
          label: "Institution",
          children: e.institution,
        },
        {
          key: "field",
          label: "Field",
          children: e.field,
        },
        {
          key: "gpa",
          label: "GPA",
          children: e.gpa,
        },
        {
          key: "startDate",
          label: "Start Date",
          children: e.startDate,
        },
        {
          key: "endDate",
          label: e.current ? "" : "End Date",
          children: e.current ? <Tag color="green">Studing</Tag> : e.endDate,
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
  }, [educations]);

  const submitHandler = (values: any) => {
    const newEdu = {
      id: editingId || Date.now().toString(),
      gpa: values.gpa,
      degree: values.degree,
      institution: values.institution,
      field: values.field,
      description: values.description,
      startDate: values.startDate.format("YYYY-MM"),
      endDate: values.current ? "" : values.endDate?.format("YYYY-MM") || "",
      current: values.current,
    };

    if (status === "edit" && editingId) {
      updateEducation(editingId, newEdu);
    } else {
      addEducation(newEdu);
    }

    form.resetFields();
    setStatus("");
    setEditingId(null);
    setModalOpen(false);
    setIsCurrent(false);
  };

  const handleEdit = (id: string) => {
    const education = educations.find((exp) => exp.id === id);
    if (education) {
      setEditingId(id);
      setStatus("edit");
      setIsCurrent(education.current);

      form.setFieldsValue({
        degree: education.degree,
        field: education.field,
        institution: education.institution,
        gpa: education.gpa || null,
        description: education.description,
        startDate: education.startDate
          ? dayjs(education.startDate, "YYYY-MM")
          : null,
        endDate: education.endDate ? dayjs(education.endDate, "YYYY-MM") : null,
        current: education.current,
      });

      setModalOpen(true);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setStatus("");
    setEditingId(null);
    setModalOpen(false);
    setIsCurrent(false);
  };

  const handleNewEducation = () => {
    form.resetFields();
    setEditingId(null);
    setStatus("new");
    setIsCurrent(false);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-y-6">
      {convertedData.map((item) => (
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
                  removeEducation(item.id);
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
      ))}

      {/* Education Form Modal */}
      <Modal
        title={status === "edit" ? "Edit Education" : "Add New Education"}
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
            {/* Degree */}
            <Col span={12}>
              <Item
                name="degree"
                label="Degree"
                rules={[{ required: true, message: "Degree is required" }]}
              >
                <Input placeholder="e.g., Bachelor of Science, Master of Arts, PhD" />
              </Item>
            </Col>

            {/* Institution */}
            <Col span={12}>
              <Item
                name="institution"
                label="Institution"
                rules={[{ required: true, message: "Institution is required" }]}
              >
                <Input placeholder="e.g., Stanford University, Massachusetts Institute of Technology" />
              </Item>
            </Col>

            {/* Field of Study */}
            <Col span={12}>
              <Item
                name="field"
                label="Field of Study"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Input placeholder="e.g., Computer Science, Business Administration, Electrical Engineering" />
              </Item>
            </Col>

            {/* GPA */}
            <Col xs={24} sm={12} lg={8}>
              <Item name="gpa" label="GPA">
                <InputNumber
                  min={0}
                  max={4}
                  step={0.1}
                  placeholder="e.g., 3.8"
                  style={{ width: "100%" }}
                />
              </Item>
            </Col>

            {/* Date Fields */}
            <Col xs={24} sm={12} lg={8}>
              <Item
                name="startDate"
                label="Start Date"
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

            <Col xs={24} sm={12} lg={8}>
              <Item
                name="current"
                label="Currently Studying"
                valuePropName="checked"
              >
                <Switch
                  onChange={(checked) => {
                    setIsCurrent(checked);
                  }}
                />
              </Item>
            </Col>

            {!isCurrent && (
              <Col xs={24} sm={12} lg={8}>
                <Item
                  name="endDate"
                  label="End Date"
                  dependencies={["current"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const isCurrent = getFieldValue("current");
                        if (!isCurrent && !value) {
                          return Promise.reject(
                            new Error(
                              "End date is required unless currently studying"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    picker="month"
                    style={{ width: "100%" }}
                    placeholder="Select end month"
                    disabled={isCurrent}
                    allowClear
                  />
                </Item>
              </Col>
            )}

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
                  placeholder="Describe your academic achievements, honors, relevant coursework, or thesis..."
                  rows={4}
                  showCount
                  maxLength={500}
                />
              </Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* New Education Button */}
      <Button
        icon={<PlusOutlined />}
        onClick={handleNewEducation}
        className="mx-auto"
        type="primary"
      >
        New Education
      </Button>
    </div>
  );
}

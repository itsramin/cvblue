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
const { Text } = Typography;

export default function WorkExperience() {
  const { addExperience, experiences, removeExperience, updateExperience } =
    useData();
  const [status, setStatus] = useState<"new" | "edit" | "">("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [convertedData, setConvertedData] = useState<
    {
      key: number;
      company: string;
      id: string;
      data: { key: string; label: string; children: React.ReactNode }[];
    }[]
  >([]);
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    // Sort experiences by date (newer first)
    const sortedExperiences = [...experiences].sort((a, b) => {
      // Handle current positions (ongoing) - they should be first
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;

      // For end dates, use endDate if available, otherwise use startDate
      const dateA = a.current ? a.startDate : a.endDate || a.startDate;
      const dateB = b.current ? b.startDate : b.endDate || b.startDate;

      // Compare in descending order (newer first)
      return dayjs(dateB, "YYYY-MM").diff(dayjs(dateA, "YYYY-MM"));
    });

    const converted = sortedExperiences.map((e, index) => ({
      key: index,
      id: e.id,
      company: e.company,
      data: [
        {
          key: "company",
          label: "Company",
          children: e.company,
        },
        {
          key: "position",
          label: "Position",
          children: e.position,
        },
        {
          key: "startDate",
          label: "Start Date",
          children: e.startDate,
        },
        {
          key: "ndDate",
          label: e.current ? "" : "End Date",
          children: e.current ? <Tag color="green">Working</Tag> : e.endDate,
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
  }, [experiences]);

  const submitHandler = (values: any) => {
    const newEx = {
      id: editingId || Date.now().toString(),
      company: values.company,
      position: values.position,
      description: values.description,
      startDate: values.startDate.format("YYYY-MM"),
      endDate: values.current ? "" : values.endDate?.format("YYYY-MM") || "",
      current: values.current,
    };

    if (status === "edit" && editingId) {
      updateExperience(editingId, newEx);
    } else {
      addExperience(newEx);
    }

    form.resetFields();
    setStatus("");
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const experience = experiences.find((exp) => exp.id === id);
    if (experience) {
      setEditingId(id);
      setStatus("edit");

      form.setFieldsValue({
        company: experience.company,
        position: experience.position,
        description: experience.description,
        startDate: experience.startDate
          ? dayjs(experience.startDate, "YYYY-MM")
          : null,
        endDate: experience.endDate
          ? dayjs(experience.endDate, "YYYY-MM")
          : null,
        current: experience.current,
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setStatus("");
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-y-6">
      {convertedData.map((item) => (
        <Card
          key={item.id}
          className="w-full"
          title={item.company}
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
                  removeExperience(item.id);
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

      {(status === "new" || status === "edit") && (
        <Form form={form} onFinish={submitHandler}>
          <div className="flex justify-between items-center mb-4">
            <Text strong>
              {status === "edit" ? "Edit Experience" : "Add New Experience"}
            </Text>
          </div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Item
                name="company"
                label="Company"
                rules={[{ required: true, message: "Company is required" }]}
              >
                <Input placeholder="Google Inc." />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="position"
                label="Position"
                rules={[{ required: true, message: "Position is required" }]}
              >
                <Input placeholder="Senior Software Engineer" />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: "Start date is required" }]}
              >
                <DatePicker picker="month" style={{ width: "100%" }} />
              </Item>
            </Col>

            <Col span={4}>
              <Item
                name="current"
                label="Current Position"
                valuePropName="checked"
              >
                <Switch
                  onChange={(checked) => {
                    setIsCurrent(checked);
                    if (checked) {
                      form.setFieldValue("endDate", null);
                    }
                  }}
                />
              </Item>
            </Col>
            {!isCurrent && (
              <Col span={8}>
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
                            new Error("End date is required unless current")
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <DatePicker picker="month" style={{ width: "100%" }} />
                </Item>
              </Col>
            )}
            <Col span={24}>
              <Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: false,
                    message: "Please describe your responsibilities",
                  },
                ]}
              >
                <TextArea
                  placeholder="Describe your responsibilities, achievements, and contributions..."
                  rows={3}
                  showCount
                  maxLength={300}
                />
              </Item>
            </Col>
          </Row>
          <Space>
            <Button
              icon={<SaveOutlined />}
              htmlType="submit"
              className="mx-auto"
              type="primary"
            >
              {status === "edit" ? "Update" : "Save"}
            </Button>
            <Button onClick={handleCancel} className="mx-auto" type="default">
              Cancel
            </Button>
          </Space>
        </Form>
      )}

      {status === "" && (
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingId(null);
            setStatus("new");
          }}
          className="mx-auto"
          type="primary"
        >
          New experience
        </Button>
      )}
    </div>
  );
}

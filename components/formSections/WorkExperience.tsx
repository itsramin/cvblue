"use client";

import { useData } from "@/store/store";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Switch,
  Card,
  Descriptions,
  Space,
  Tag,
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
import EditableList from "../EditableList";
import { EditableItem } from "@/type/type";

const { Item } = Form;
const { TextArea } = Input;

export default function WorkExperience() {
  const { addExperience, experiences, removeExperience, updateExperience } =
    useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
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
  const [responsibilities, setResponsibilities] = useState<EditableItem[]>([]);
  const [achievements, setAchievements] = useState<EditableItem[]>([]);

  useEffect(() => {
    // Sort experiences by date (newer first)
    const sortedExperiences = [...experiences].sort((a, b) => {
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;

      const dateA = a.current ? a.startDate : a.endDate || a.startDate;
      const dateB = b.current ? b.startDate : b.endDate || b.startDate;

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
          key: "responsibilities",
          label: "Responsibilities",
          children:
            e.responsibilities && e.responsibilities.length > 0 ? (
              <ul className="list-disc pl-4">
                {e.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            ) : (
              "N/A"
            ),
          span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        },
        {
          key: "achievements",
          label: "Achievements",
          children:
            e.achievements && e.achievements.length > 0 ? (
              <ul className="list-disc pl-4">
                {e.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            ) : (
              "N/A"
            ),
          span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
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

  const showModal = (mode: "add" | "edit", id?: string) => {
    if (mode === "edit" && id) {
      setModalTitle("Edit Experience");
      setEditingId(id);
      handleEdit(id);
    } else {
      setModalTitle("Add New Experience");
      setEditingId(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    resetForm();
    form.resetFields();
  };

  const resetForm = () => {
    setResponsibilities([]);
    setAchievements([]);
    setIsCurrent(false);
    setEditingId(null);
  };

  const submitHandler = (values: any) => {
    const newEx = {
      id: editingId || Date.now().toString(),
      company: values.company,
      position: values.position,
      description: values.description,
      achievements: achievements.map((item) => item.content),
      responsibilities: responsibilities.map((item) => item.content),
      startDate: values.startDate.format("YYYY-MM"),
      endDate: values.current ? "" : values.endDate?.format("YYYY-MM") || "",
      current: values.current,
    };

    if (editingId) {
      updateExperience(editingId, newEx);
    } else {
      addExperience(newEx);
    }

    handleCancelModal();
  };

  const handleEdit = (id: string) => {
    const experience = experiences.find((exp) => exp.id === id);
    if (experience) {
      setEditingId(id);

      const responsibilityItems: EditableItem[] =
        experience.responsibilities.map((item, index) => ({
          id: `resp-${Date.now()}-${index}`,
          content: item,
          isEditing: false,
        }));

      const achievementItems: EditableItem[] = experience.achievements.map(
        (item, index) => ({
          id: `achieve-${Date.now()}-${index}`,
          content: item,
          isEditing: false,
        })
      );

      setResponsibilities(responsibilityItems);
      setAchievements(achievementItems);
      setIsCurrent(experience.current);

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
                onClick={() => showModal("edit", item.id)}
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

      <Button
        icon={<PlusOutlined />}
        onClick={() => showModal("add")}
        className="mx-auto"
        type="primary"
      >
        New experience
      </Button>

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={submitHandler} layout="vertical">
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
                <DatePicker
                  picker="month"
                  style={{ width: "100%" }}
                  allowClear
                />
              </Item>
            </Col>

            <Col span={8}>
              <Item
                name="current"
                label="Current Position"
                valuePropName="checked"
                layout="horizontal"
                className="!bottom-0 absolute "
              >
                <Switch
                  onChange={(checked) => {
                    setIsCurrent(checked);
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
                  <DatePicker
                    picker="month"
                    style={{ width: "100%" }}
                    allowClear
                  />
                </Item>
              </Col>
            )}

            {/* Responsibilities Section */}
            <Col span={24}>
              <EditableList
                items={responsibilities}
                onItemsChange={setResponsibilities}
                placeholder="Add a responsibility..."
                label="Key Responsibilities"
              />
            </Col>

            {/* Achievements Section */}
            <Col span={24}>
              <EditableList
                items={achievements}
                onItemsChange={setAchievements}
                placeholder="Add an achievement..."
                label="Key Achievements"
              />
            </Col>

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
          <div className="flex items-center justify-end gap-x-4 pt-4 ">
            <Button onClick={handleCancelModal} type="default">
              Cancel
            </Button>
            <Button icon={<SaveOutlined />} htmlType="submit" type="primary">
              {editingId ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

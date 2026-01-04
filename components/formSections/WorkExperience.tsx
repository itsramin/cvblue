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
  List,
  Card,
  Descriptions,
  Space,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HolderOutlined } from "@ant-design/icons";
import type { DragEndEvent, DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { GetProps } from "antd";
import dayjs from "dayjs";

interface SortableListItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

const SortableListItemContext = createContext<SortableListItemContextProps>({});

const { Item } = Form;
const { TextArea } = Input;
const { Text } = Typography;

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(
    SortableListItemContext
  );
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
    />
  );
};

const SortableListItem: React.FC<
  GetProps<typeof List.Item> & { itemKey: number }
> = (props) => {
  const { itemKey, style, ...rest } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey });

  const listStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const memoizedValue = useMemo<SortableListItemContextProps>(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes]
  );

  return (
    <SortableListItemContext.Provider value={memoizedValue}>
      <List.Item {...rest} ref={setNodeRef} style={listStyle} />
    </SortableListItemContext.Provider>
  );
};

export default function WorkExperience() {
  const {
    addExperience,
    experiences,
    removeExperience,
    updateExperience,
    reorderExperiences,
  } = useData();
  const [status, setStatus] = useState<"new" | "edit" | "">("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [convertedData, setConvertedData] = useState<
    {
      key: number;
      company: string;
      id: string;
      data: { key: string; label: string; children: string }[];
    }[]
  >([]);

  useEffect(() => {
    const converted = experiences.map((e, index) => ({
      key: index,
      id: e.id,
      company: e.company,
      data: [
        {
          key: "company",
          label: "company",
          children: e.company,
        },
        {
          key: "position",
          label: "position",
          children: e.position,
        },
        {
          key: "startDate",
          label: "startDate",
          children: e.startDate,
        },
        {
          key: "endDate",
          label: "endDate",
          children: e.endDate,
        },
        {
          key: "current",
          label: "current",
          children: e.current ? "Working" : "",
        },
        {
          key: "description",
          label: "description",
          children: e.description,
          span: 3,
        },
      ],
    }));

    setConvertedData(converted);
  }, [experiences]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      const activeIndex = experiences.findIndex(
        (_, index) => index === active.id
      );
      const overIndex = experiences.findIndex((_, index) => index === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        setConvertedData((prevState) => {
          return arrayMove(prevState, activeIndex, overIndex);
        });

        const reorderedExperiences = arrayMove(
          experiences,
          activeIndex,
          overIndex
        );
        reorderExperiences(reorderedExperiences);
      }
    }
  };

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
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
        id="list-drag-sorting-handler"
      >
        <SortableContext
          items={convertedData.map((item) => item.key)}
          strategy={verticalListSortingStrategy}
        >
          <List
            dataSource={convertedData}
            renderItem={(item) => (
              <SortableListItem key={item.key} itemKey={item.key}>
                <Card
                  className="w-full"
                  title={
                    <div className="flex items-center gap-2">
                      <DragHandle />
                      <span>{item.company}</span>
                    </div>
                  }
                  extra={
                    <Space>
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(item.id)}
                        size="small"
                      />
                      <DeleteOutlined
                        onClick={() => {
                          removeExperience(item.id);
                        }}
                        style={{ color: "#ff4d4f", cursor: "pointer" }}
                      />
                    </Space>
                  }
                >
                  <Descriptions items={item.data} />
                </Card>
              </SortableListItem>
            )}
          />
        </SortableContext>
      </DndContext>

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
                  disabled={form.getFieldValue("current")}
                />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                name="current"
                label="Current Position"
                valuePropName="checked"
              >
                <Switch
                  onChange={(checked) => {
                    if (checked) {
                      form.setFieldValue("endDate", null);
                    }
                  }}
                />
              </Item>
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

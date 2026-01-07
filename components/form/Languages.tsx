import React, { useEffect, useState } from "react";
import { Input, Select, Button, Tag, Form, Empty } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { ILanguage } from "@/type/type";
import { useData } from "@/store/store";

const { Option } = Select;

// Types

interface LevelOption {
  value: number;
  label: string;
  color: string;
}

// Simplified proficiency levels
const LANGUAGE_LEVELS: LevelOption[] = [
  { value: 1, label: "Beginner", color: "gray" },
  { value: 2, label: "Intermediate", color: "blue" },
  { value: 3, label: "Advanced", color: "green" },
  { value: 4, label: "Native", color: "red" },
  { value: 5, label: "Fluent", color: "purple" },
];

const Languages: React.FC = () => {
  const [enteredLanguages, setEnteredLanguages] = useState<ILanguage[]>([]);
  const [form] = Form.useForm();
  const { languages, updateLanguages } = useData();

  useEffect(() => {
    setEnteredLanguages(languages);
  }, [languages]);

  const handleAddLanguage = (values: Omit<ILanguage, "id">) => {
    const newLanguage: ILanguage = {
      name: values.name,
      level: LANGUAGE_LEVELS.find((l) => l.value === values.level)?.value || 1,
      id: Date.now(),
    };
    const sorted = [...enteredLanguages, newLanguage].sort(
      (a, b) => b.level - a.level
    );
    setEnteredLanguages(sorted);
    updateLanguages(sorted);
    form.resetFields();
  };

  const handleDelete = (id: number) => {
    setEnteredLanguages(enteredLanguages.filter((lang) => lang.id !== id));
  };

  const getLevelInfo = (levelValue: number): LevelOption => {
    return (
      LANGUAGE_LEVELS.find((l) => l.value === levelValue) || LANGUAGE_LEVELS[0]
    );
  };

  return (
    <div>
      {/* Languages List - TOP */}
      <div className="mb-8">
        {enteredLanguages.length === 0 ? (
          <Empty description="No languages added yet" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {enteredLanguages.map((language) => {
              const levelInfo = getLevelInfo(language.level);

              return (
                <div
                  key={language.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 "
                >
                  <div className="flex justify-between items-start ">
                    <div className="flex gap-x-2">
                      <h3 className="font-bold text-gray-800">
                        {language.name}{" "}
                      </h3>
                      <Tag color={levelInfo.color}>{levelInfo.label}</Tag>
                    </div>
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(language.id)}
                      className="opacity-70 hover:opacity-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Language Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 pb-2 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add New Language
        </h2>
        <Form form={form} layout="vertical" onFinish={handleAddLanguage}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <Form.Item
              name="name"
              label={
                <span className="font-medium text-gray-700">Language</span>
              }
              rules={[{ required: true, message: "Please enter a language" }]}
            >
              <Input
                placeholder="e.g., English, Spanish, French"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="level"
              label={
                <span className="font-medium text-gray-700">
                  Proficiency Level
                </span>
              }
              rules={[{ required: true, message: "Please select a level" }]}
            >
              <Select
                placeholder="Select proficiency level"
                size="large"
                className="rounded-lg"
              >
                {LANGUAGE_LEVELS.map((l) => (
                  <Option key={l.value} value={l.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            l.color === "gray"
                              ? "#9CA3AF"
                              : l.color === "blue"
                              ? "#3B82F6"
                              : l.color === "green"
                              ? "#10B981"
                              : l.color === "purple"
                              ? "#8B5CF6"
                              : "#EF4444",
                        }}
                      />
                      {l.label}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon={<PlusOutlined />}
              >
                Add Language
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Languages;

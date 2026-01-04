import { useData } from "@/store/store";
import { useState } from "react";
import { Form, Input, Button, Space, Select, Tag, Typography } from "antd";

const { Item } = Form;
const { Text } = Typography;

export default function Skills() {
  const { data, updateData, addSkill, removeSkill } = useData();
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <>
      <div className="mb-4">
        <Space.Compact style={{ width: "100%" }}>
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a skill (e.g., React, Python, Project Management)"
          />
          <Button type="primary" onClick={handleAddSkill}>
            Add
          </Button>
        </Space.Compact>
      </div>

      <div className="mb-4">
        <Item name="skills">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Select or add skills"
            value={data.skills}
            onChange={(value) => updateData({ ...data, skills: value })}
          />
        </Item>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, index) => (
          <Tag
            key={index}
            closable
            onClose={() => removeSkill(index)}
            className="text-sm py-1 px-3"
          >
            {skill}
          </Tag>
        ))}
        {data.skills.length === 0 && (
          <Text type="secondary">
            No skills added yet. Add some skills to showcase your expertise.
          </Text>
        )}
      </div>
    </>
  );
}

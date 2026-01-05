import React, { useEffect, useState } from "react";
import { useData } from "@/store/store";
import EditableList from "../EditableList";
import { EditableItem } from "@/type/type";

const Skills: React.FC = () => {
  const { updateSkills, skills } = useData();
  const [items, setItems] = useState<EditableItem[]>([]);

  useEffect(() => {
    const initialItems = skills.map((skill, index) => ({
      id: `skill-${index}`,
      content: skill,
      isEditing: false,
    }));
    setItems(initialItems);
  }, []);

  useEffect(() => {
    const skillContents = items.map((item) => item.content);
    updateSkills(skillContents);
  }, [items, updateSkills]);

  const handleItemsChange = (newItems: EditableItem[]) => {
    setItems(newItems);
  };

  return (
    <EditableList
      canReorder
      items={items}
      onItemsChange={handleItemsChange}
      placeholder="Add a skill..."
      label="Skills"
    />
  );
};

export default Skills;

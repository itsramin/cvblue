import React, { useEffect, useState } from "react";
import { useData } from "@/store/store";
import EditableList from "../UI/EditableList";
import { IEditableItem } from "@/type/type";

const Skills: React.FC = () => {
  const { updateSkills, skills } = useData();
  const [items, setItems] = useState<IEditableItem[]>([]);

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

  const handleItemsChange = (newItems: IEditableItem[]) => {
    setItems(newItems);
  };

  return (
    <EditableList
      reorderable
      items={items}
      onItemsChange={handleItemsChange}
      placeholder="Add a skill..."
      label="Skills"
    />
  );
};

export default Skills;

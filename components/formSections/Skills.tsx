import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Flex, Input, Tag } from "antd";
import { useData } from "@/store/store";

const tagInputStyle: React.CSSProperties = {
  width: 120,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const Skills: React.FC = () => {
  const [enteredSkills, setEnteredSkills] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { updateSkills, skills } = useData();

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    setEnteredSkills(skills);
  }, []);

  const handleClose = (removedTag: string) => {
    const newSkill = enteredSkills.filter((tag) => tag !== removedTag);

    setEnteredSkills(newSkill);
    updateSkills(newSkill);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputConfirm = () => {
    if (inputValue && !enteredSkills.includes(inputValue)) {
      setEnteredSkills([...enteredSkills, inputValue]);
      updateSkills([...enteredSkills, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  return (
    <Flex gap="4px" align="center" wrap>
      {enteredSkills.map((tag) => (
        <Tag
          color="blue"
          key={tag}
          closable
          style={{ userSelect: "none" }}
          onClose={() => handleClose(tag)}
        >
          <span>{tag}</span>
        </Tag>
      ))}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          style={tagInputStyle}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Button icon={<PlusOutlined />} onClick={showInput}>
          New Skill
        </Button>
      )}
    </Flex>
  );
};

export default Skills;

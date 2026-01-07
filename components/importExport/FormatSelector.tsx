import React from "react";
import { Radio, RadioChangeEvent } from "antd";

interface FormatSelectorProps {
  value: "json" | "xml";
  onChange: (value: "json" | "xml") => void;
  className?: string;
  buttonStyle?: "solid" | "outline";
}

const FormatSelector: React.FC<FormatSelectorProps> = ({
  value,
  onChange,
  className = "",
  buttonStyle = "solid",
}) => {
  const handleChange = (e: RadioChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <Radio.Group
      value={value}
      onChange={handleChange}
      buttonStyle={buttonStyle}
      className={className}
    >
      <Radio.Button value="json" className="min-w-[100px] text-center py-2">
        JSON
      </Radio.Button>
      <Radio.Button value="xml" className="min-w-[100px] text-center py-2">
        XML
      </Radio.Button>
    </Radio.Group>
  );
};

export default FormatSelector;

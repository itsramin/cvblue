"use client";

import { useData } from "@/store/store";
import { Form, Input, Row, Col } from "antd";
import { useEffect } from "react";
import { debounce } from "lodash";

const { Item } = Form;
const { TextArea } = Input;

export default function PersonalInfo() {
  const [form] = Form.useForm();
  const { personalInfo, updatePersonalInfo, hasHydrated } = useData();

  useEffect(() => {
    form.setFieldsValue(personalInfo);
  }, [hasHydrated]);

  const debouncedUpdate = debounce((field: string, value: string) => {
    updatePersonalInfo(field as keyof typeof personalInfo, value);
  }, 300);

  function fieldHandler(changedFields: any[], _allFields: any[]) {
    if (changedFields.length > 0) {
      const { name, value } = changedFields[0];
      debouncedUpdate(name[0], value);
    }
  }
  return (
    <Form form={form} onFieldsChange={fieldHandler}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="John Doe" />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            label="Professional Title"
            name="title"
            rules={[{ required: true, message: "Please enter your title" }]}
          >
            <Input placeholder="Senior Software Engineer" />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="john.doe@example.com" />
          </Item>
        </Col>
        <Col span={12}>
          <Item label="Phone" name="phone">
            <Input placeholder="+1 (123) 456-7890" />
          </Item>
        </Col>
        <Col span={12}>
          <Item label="Location" name="location">
            <Input placeholder="San Francisco, CA" />
          </Item>
        </Col>
        <Col span={12}>
          <Item label="LinkedIn URL" name="linkedin">
            <Input placeholder="https://linkedin.com/in/johndoe" />
          </Item>
        </Col>
        <Col span={24}>
          <Item label="Portfolio/Website" name="portfolio">
            <Input placeholder="https://johndoe.com" />
          </Item>
        </Col>
        <Col span={24}>
          <Item label="Professional Summary" name="aboutMe">
            <TextArea
              placeholder="Briefly describe your professional background, skills, and career goals..."
              rows={4}
              showCount
              maxLength={500}
            />
          </Item>
        </Col>
      </Row>
    </Form>
  );
}

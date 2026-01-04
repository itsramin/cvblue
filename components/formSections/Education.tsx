import { useData } from "@/store/store";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  DatePicker,
  InputNumber,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Item } = Form;
const { TextArea } = Input;
const { Text } = Typography;

export default function Education() {
  // const { data, addEducation, removeEducation } = useData();

  return (
    <div className="flex flex-col gap-y-6">
      {/* <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <Text strong>Education {name + 1}</Text>
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      remove(name);
                      removeEducation(data.education[name]?.id);
                    }}
                  />
                </div>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Item
                      {...restField}
                      name={[name, "institution"]}
                      label="Institution"
                      rules={[
                        { required: true, message: "Institution is required" },
                      ]}
                    >
                      <Input placeholder="Stanford University" />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      {...restField}
                      name={[name, "degree"]}
                      label="Degree"
                      rules={[
                        { required: true, message: "Degree is required" },
                      ]}
                    >
                      <Input placeholder="Master of Science" />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      {...restField}
                      name={[name, "field"]}
                      label="Field of Study"
                      rules={[{ required: true, message: "Field is required" }]}
                    >
                      <Input placeholder="Computer Science" />
                    </Item>
                  </Col>
                  <Col span={8}>
                    <Item
                      {...restField}
                      name={[name, "startDate"]}
                      label="Start Date"
                      rules={[
                        { required: true, message: "Start date is required" },
                      ]}
                    >
                      <DatePicker picker="month" style={{ width: "100%" }} />
                    </Item>
                  </Col>
                  <Col span={8}>
                    <Item
                      {...restField}
                      name={[name, "endDate"]}
                      label="End Date"
                      rules={[
                        { required: true, message: "End date is required" },
                      ]}
                    >
                      <DatePicker picker="month" style={{ width: "100%" }} />
                    </Item>
                  </Col>
                  <Col span={8}>
                    <Item {...restField} name={[name, "gpa"]} label="GPA">
                      <InputNumber
                        min={0}
                        max={4}
                        step={0.1}
                        placeholder="3.8"
                        style={{ width: "100%" }}
                      />
                    </Item>
                  </Col>
                  <Col span={24}>
                    <Item
                      {...restField}
                      name={[name, "description"]}
                      label="Description"
                    >
                      <TextArea
                        placeholder="Relevant coursework, achievements, honors..."
                        rows={2}
                        showCount
                        maxLength={200}
                      />
                    </Item>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}
      </Form.List> */}
      <Button
        icon={<PlusOutlined />}
        // onClick={addEducation}
        className="mx-auto"
        type="primary"
      >
        Add Education
      </Button>
    </div>
  );
}

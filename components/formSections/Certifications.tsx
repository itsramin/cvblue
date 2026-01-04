import { useData } from "@/store/store";
import { Form, Input, Row, Col, Button, Typography, DatePicker } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Item } = Form;
const { Text } = Typography;

export default function Certifications() {
  const { data, updateData } = useData();

  const handleAddCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      link: "",
    };
    updateData({
      ...data,
      certifications: [...data.certifications, newCert],
    });
  };

  return (
    <div className="flex flex-col gap-y-6">
      <Form.List name="certifications">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <Text strong>Certification {name + 1}</Text>
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                </div>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Item
                      {...restField}
                      name={[name, "name"]}
                      label="Certification Name"
                      rules={[
                        {
                          required: true,
                          message: "Certification name is required",
                        },
                      ]}
                    >
                      <Input placeholder="AWS Certified Solutions Architect" />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      {...restField}
                      name={[name, "issuer"]}
                      label="Issuing Organization"
                      rules={[
                        { required: true, message: "Issuer is required" },
                      ]}
                    >
                      <Input placeholder="Amazon Web Services" />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      {...restField}
                      name={[name, "date"]}
                      label="Issue Date"
                      rules={[
                        { required: true, message: "Issue date is required" },
                      ]}
                    >
                      <DatePicker picker="month" style={{ width: "100%" }} />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      {...restField}
                      name={[name, "link"]}
                      label="Credential URL"
                    >
                      <Input placeholder="https://aws.amazon.com/certification" />
                    </Item>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}
      </Form.List>
      <Button
        icon={<PlusOutlined />}
        onClick={handleAddCertification}
        className="mx-auto"
        type="primary"
      >
        Add Certification
      </Button>
    </div>
  );
}

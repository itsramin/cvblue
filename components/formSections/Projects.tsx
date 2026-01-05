"use client";

import { useData } from "@/store/store";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Card,
  Descriptions,
  Space,
  Modal,
  Tag,
  Image,
  Upload,
  message,
  UploadFile,
  UploadProps,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  EditOutlined,
  UploadOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditableList from "../EditableList";
import type { RcFile } from "antd/es/upload";
import { EditableItem } from "@/type/type";

const { Item } = Form;
const { TextArea } = Input;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Projects() {
  const { addProject, projects, removeProject, updateProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [convertedData, setConvertedData] = useState<
    {
      key: number;
      name: string;
      id: string;
      data: { key: string; label: string; children: React.ReactNode }[];
      images?: string[];
    }[]
  >([]);
  const [technologies, setTechnologies] = useState<EditableItem[]>([]);
  const [imagesBase64, setImagesBase64] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      messageApi.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      messageApi.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }

    // Check total files count (including existing)
    const totalFiles = fileList.length;
    if (totalFiles > 5) {
      messageApi.error("You can only upload up to 5 images per project!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  useEffect(() => {
    // Sort projects by date (newer first)
    const sortedProjects = [...projects].sort((a, b) => {
      return dayjs(b.date, "YYYY-MM").diff(dayjs(a.date, "YYYY-MM"));
    });

    const converted = sortedProjects.map((p, index) => ({
      key: index,
      id: p.id,
      name: p.name,
      images: p.images,
      data: [
        {
          key: "name",
          label: "Project Name",
          children: p.name,
        },
        {
          key: "role",
          label: "Your Role",
          children: p.role,
        },
        {
          key: "date",
          label: "Date",
          children: p.date,
        },
        {
          key: "technologies",
          label: "Technologies",
          children:
            p.technologies && p.technologies.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {p.technologies.map((tech, idx) => (
                  <Tag key={idx} color="blue">
                    {tech}
                  </Tag>
                ))}
              </div>
            ) : (
              ""
            ),
        },
        {
          key: "description",
          label: "Description",
          children: p.description,
          span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        },
        {
          key: "images",
          label: "Images",
          children:
            p.images && p.images.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {p.images.slice(0, 3).map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`${p.name} - ${idx + 1}`}
                    width={80}
                    height={60}
                    className="rounded object-cover cursor-pointer"
                    onClick={() => {
                      setPreviewImage(img);
                      setPreviewTitle(`${p.name} - Image ${idx + 1}`);
                      setPreviewOpen(true);
                    }}
                    preview={{ visible: false }}
                  />
                ))}
                {p.images.length > 3 && (
                  <div className="flex items-center justify-center w-20 h-15 bg-gray-100 rounded">
                    <span className="text-gray-500">
                      +{p.images.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-32 h-20 bg-gray-100 rounded">
                <PictureOutlined className="text-gray-400 text-2xl" />
              </div>
            ),
          span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        },
        {
          key: "link",
          label: "Link",
          children: p.link ? (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Project
            </a>
          ) : (
            ""
          ),
        },
      ],
    }));

    setConvertedData(converted);
  }, [projects]);

  const showModal = (mode: "add" | "edit", id?: string) => {
    if (mode === "edit" && id) {
      setModalTitle("Edit Project");
      setEditingId(id);
      handleEdit(id);
    } else {
      setModalTitle("Add New Project");
      setEditingId(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    resetForm();
    form.resetFields();
  };

  const resetForm = () => {
    setTechnologies([]);
    setImagesBase64([]);
    setFileList([]);
    setEditingId(null);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleUploadChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);

    // Convert all files to Base64
    const base64Images: string[] = [];
    for (const file of newFileList) {
      if (file.originFileObj) {
        try {
          const base64 = await getBase64(file.originFileObj as RcFile);
          base64Images.push(base64);
        } catch (error) {
          console.error("Error converting image to Base64:", error);
        }
      } else if (file.url) {
        // For existing images (when editing)
        base64Images.push(file.url);
      }
    }

    setImagesBase64(base64Images);
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
      <div className="text-xs text-gray-500">Max 5 images, 2MB each</div>
    </div>
  );

  const submitHandler = async (values: any) => {
    const newProject = {
      id: editingId || Date.now().toString(),
      name: values.name,
      role: values.role,
      description: values.description,
      technologies:
        technologies.length > 0
          ? technologies.map((item) => item.content)
          : undefined,
      link: values.link || "",
      date: values.date.format("YYYY-MM"),
      images: imagesBase64.length > 0 ? imagesBase64 : undefined,
    };

    if (editingId) {
      updateProject(editingId, newProject);
    } else {
      addProject(newProject);
    }

    handleCancelModal();
  };

  const handleEdit = (id: string) => {
    const project = projects.find((proj) => proj.id === id);
    if (project) {
      setEditingId(id);

      const techItems: EditableItem[] = (project.technologies || []).map(
        (item, index) => ({
          id: `tech-${Date.now()}-${index}`,
          content: item,
          isEditing: false,
        })
      );

      setTechnologies(techItems);

      // Set existing images
      if (project.images && project.images.length > 0) {
        const existingImages = project.images;
        setImagesBase64(existingImages);

        // Create file list for upload component
        const files: UploadFile[] = existingImages.map((img, index) => ({
          uid: `existing-${index}`,
          name: `image-${index + 1}.jpg`,
          status: "done",
          url: img,
        }));
        setFileList(files);
      }

      form.setFieldsValue({
        name: project.name,
        role: project.role,
        description: project.description,
        link: project.link || "",
        date: project.date ? dayjs(project.date, "YYYY-MM") : null,
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      {contextHolder}
      {convertedData.map((item) => (
        <Card
          key={item.id}
          className="w-full"
          title={item.name}
          extra={
            <Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => showModal("edit", item.id)}
                size="small"
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  removeProject(item.id);
                }}
              />
            </Space>
          }
        >
          <Descriptions
            items={item.data}
            column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
          />
        </Card>
      ))}

      <Button
        icon={<PlusOutlined />}
        onClick={() => showModal("add")}
        className="mx-auto"
        type="primary"
      >
        Add Project
      </Button>

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={submitHandler} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Item
                name="name"
                label="Project Name"
                rules={[
                  { required: true, message: "Project name is required" },
                ]}
              >
                <Input placeholder="E-commerce Website" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="role" label="Your Role">
                <Input placeholder="Full-stack Developer" />
              </Item>
            </Col>

            <Col span={12}>
              <Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Date is required" }]}
              >
                <DatePicker
                  picker="month"
                  style={{ width: "100%" }}
                  allowClear
                />
              </Item>
            </Col>

            <Col span={12}>
              <Item
                name="link"
                label="Project Link"
                rules={[
                  {
                    required: false,
                    type: "url",
                    message: "Please enter a valid URL",
                  },
                ]}
              >
                <Input placeholder="https://github.com/username/project" />
              </Item>
            </Col>

            <Col span={24}>
              <div className="mb-2">
                <label className="ant-form-item-label">Project Images</label>
                <div className="text-gray-500 text-sm">
                  Upload up to 5 images.
                  {imagesBase64.length > 0 && (
                    <span className="ml-2 text-blue-600">
                      {imagesBase64.length}/5 images uploaded
                    </span>
                  )}
                </div>
              </div>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleUploadChange}
                beforeUpload={beforeUpload}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess?.("ok");
                  }, 0);
                }}
                multiple
                maxCount={5}
                accept="image/*"
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
            </Col>

            <Col span={24} className="mt-4">
              <EditableList
                label="Technologies Used"
                items={technologies}
                onItemsChange={setTechnologies}
                placeholder="Add a technology (e.g., React, Node.js)"
              />
            </Col>

            <Col span={24}>
              <Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please describe your project",
                  },
                ]}
              >
                <TextArea
                  placeholder="Describe your project, its purpose, features, and your contributions..."
                  rows={4}
                  showCount
                  maxLength={500}
                />
              </Item>
            </Col>
          </Row>
          <div className="flex items-center justify-end gap-x-4 pt-4 ">
            <Button onClick={handleCancelModal} type="default">
              Cancel
            </Button>
            <Button icon={<SaveOutlined />} htmlType="submit" type="primary">
              {editingId ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image
          alt="Project image preview"
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
}

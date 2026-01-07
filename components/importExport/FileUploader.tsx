import React from "react";
import { Upload, Button, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
  disabled?: boolean;
  accept?: string;
  buttonText?: string;
  buttonProps?: any;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onUpload,
  disabled = false,
  accept = ".json,.xml",
  buttonText = "Upload File",
  buttonProps = {},
}) => {
  const uploadProps: UploadProps = {
    beforeUpload: (file: File) => {
      onUpload(file);
      return false; // Prevent auto upload
    },
    showUploadList: false,
    accept,
    multiple: false,
    disabled,
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />} disabled={disabled} {...buttonProps}>
        {buttonText}
      </Button>
    </Upload>
  );
};

export default FileUploader;

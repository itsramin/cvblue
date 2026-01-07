import { Card, Button, Typography } from "antd";
import { PlusOutlined, FileTextOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface EmptyStateProps {
  searchTerm: string;
  onCreateCV: () => void;
}

export default function EmptyState({
  searchTerm,
  onCreateCV,
}: EmptyStateProps) {
  return (
    <Card className="text-center py-12 border-dashed border-2">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileTextOutlined className="text-2xl text-gray-400" />
        </div>
        <Title level={4} className="!mb-2">
          {searchTerm ? "No CVs found" : "No CVs yet"}
        </Title>
        <Text type="secondary" className="mb-6 max-w-md">
          {searchTerm
            ? "Try adjusting your search terms"
            : "Create your professional CV to showcase your skills and experience"}
        </Text>
        {!searchTerm && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onCreateCV}
            size="large"
          >
            Create First CV
          </Button>
        )}
      </div>
    </Card>
  );
}

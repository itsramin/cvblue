"use client";

import { useData } from "@/store/store";
import { useState } from "react";
import EmptyState from "@/components/dashboard/EmptyState";
import CreateCVModal from "@/components/dashboard/CreateCVModal";
import ExportModal from "@/components/dashboard/ExportModal";
import CVList from "@/components/dashboard/CVList";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Skeleton } from "antd";

export default function Dashboard() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedExportCVs, setSelectedExportCVs] = useState<string[]>([]);
  const { cvs, hasHydrated } = useData();

  if (!hasHydrated && cvs.length === 0) {
    return (
      <div>
        <DashboardHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onCreateCV={() => setIsCVModalOpen(true)}
          onExportAll={() => setIsExportModalOpen(true)}
          hasCVs={cvs.length > 0}
        />
        <Skeleton />
      </div>
    );
  }
  const filteredCVs = cvs.filter((cv) =>
    cv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="">
        {/* Header */}
        <DashboardHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onCreateCV={() => setIsCVModalOpen(true)}
          onExportAll={() => setIsExportModalOpen(true)}
          hasCVs={cvs.length > 0}
        />

        {/* CV List */}
        {filteredCVs.length > 0 ? (
          <CVList cvs={filteredCVs} />
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            onCreateCV={() => setIsCVModalOpen(true)}
          />
        )}
      </div>

      {/* Create New CV Modal */}
      <CreateCVModal
        open={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />

      {/* Export All CVs Modal */}
      <ExportModal
        open={isExportModalOpen}
        onClose={() => {
          setIsExportModalOpen(false);
          setSelectedExportCVs([]);
        }}
        cvs={filteredCVs}
        selectedExportCVs={selectedExportCVs}
        onSelectAll={() => setSelectedExportCVs(filteredCVs.map((cv) => cv.id))}
        onDeselectAll={() => setSelectedExportCVs([])}
        onToggleCVSelection={(cvId) =>
          setSelectedExportCVs((prev) =>
            prev.includes(cvId)
              ? prev.filter((id) => id !== cvId)
              : [...prev, cvId]
          )
        }
      />
    </>
  );
}

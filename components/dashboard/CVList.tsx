import { ICV } from "@/type/type";
import CVCard from "./CVCard";

interface CVListProps {
  cvs: ICV[];
}

export default function CVList({ cvs }: CVListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cvs.map((cv) => (
        <CVCard key={cv.id} cv={cv} />
      ))}
    </div>
  );
}

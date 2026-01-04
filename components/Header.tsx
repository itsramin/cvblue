import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between p-6 bg-slate-200">
      <Link href={"/"}>CV Maker</Link>
      <Link href={"/preview"}>Preview</Link>
    </div>
  );
}

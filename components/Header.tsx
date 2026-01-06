import { Space } from "antd";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between py-6 px-10  items-center bg-gradient-to-l from-blue-600 to-blue-800">
      <Link href={"/"} className="font-bold text-3xl !text-white">
        CV Blue
      </Link>

      <Space size={25}>
        <Link href={"/form"} className=" !text-white">
          Form
        </Link>
        <Link href={"/preview"} className=" !text-white">
          Preview
        </Link>
      </Space>
    </div>
  );
}

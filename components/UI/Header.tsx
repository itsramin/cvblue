import { Space } from "antd";
import Link from "next/link";
import logo from "@/public/images/logo-white.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between py-5 px-3 md:px-10  items-center bg-blue-600 ">
      <Link href={"/"} className="font-bold text-3xl !text-white">
        <Image
          src={logo}
          alt="logo"
          height={60}
          width={200}
          className="h-10 w-auto md:h-16 "
        />
      </Link>

      <Space size={25}>
        <Link href={"/dashboard"} className=" !text-white">
          Dashboard
        </Link>

        <Link href={"/about"} className=" !text-white">
          About
        </Link>
      </Space>
    </div>
  );
}

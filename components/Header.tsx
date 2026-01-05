import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between p-6 items-center bg-slate-700">
      <Link href={"/"} className="font-bold text-3xl !text-white">
        CV Maker
      </Link>

      <Link href={"/preview"} className=" !text-white">
        Preview
      </Link>
    </div>
  );
}

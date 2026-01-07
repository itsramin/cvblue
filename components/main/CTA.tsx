import { Button } from "antd";
import { StarOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="px-4 py-16 md:px-10 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <StarOutlined className="text-2xl" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Create Your Winning CV?
        </h2>
        <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
          Join thousands of professionals who landed their dream jobs with our
          CV builder. It's free, easy, and takes just minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={"/dashboard"}>
            <Button type="primary" size="large">
              Get Started Free
            </Button>
          </Link>
          {/* <Link href={"/preview"}>
              <Button
                size="large"
                className="h-14 px-10 text-lg border-2 border-white text-white hover:bg-white/10"
                icon={<EyeOutlined />}
              >
                View Examples
              </Button>
            </Link> */}
        </div>
        <p className="mt-8 text-sm opacity-90">
          No credit card • No registration • No hidden fees
        </p>
      </div>
    </div>
  );
}

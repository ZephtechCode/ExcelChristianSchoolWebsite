import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Divider from "~/components/Divider";

export const meta: MetaFunction = () => {
  return [
    { title: "Excel Christian School" },
    { name: "description", content: "Excel Christian School" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center bg-[#f4f4e8] min-h-[100vh] p-4">
      <div className="max-w-[1200px] flex flex-col items-center">
        <h1 className="text-4xl my-4 uppercase text-serif">Welcome to Excel</h1>
        <Divider />
        <p className="text-lg mt-4">
          We believe you’ll make an excellent decision by choosing Christian
          education for your children, and we would be honored to be a part of
          it. Our prayer is that together we will shape your children both
          spiritually and academically, as well as strengthen their skills and
          influence their world views. Although our world seems to be changing
          at a rapid pace, the one constant we can all stand on is Jesus Christ.
          He is the same yesterday, today and tomorrow! We are excited to not
          only lead your children to a deeper understanding of who God is, but
          also to equip them to reach their God-given potential.
        </p>
      </div>
      <Outlet />
    </div>
  );
}

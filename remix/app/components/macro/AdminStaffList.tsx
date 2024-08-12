import { useLoaderData } from "@remix-run/react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getFacultyData } from "~/utils/api";
import { useQuery } from "@tanstack/react-query";

type GroupMember = {
  Name: string;
  Position: string;
  Education: string;
  Licenses: string;
  Description: string;
  Image?: any;
};

type CardData = {
  facultyData: GroupMember[];
};

export function AdminStaffList() {
  const data = useLoaderData() as CardData;
  console.log({ data });
  // const { facultyData } = data;
  // const { data, error } = useQuery({
  //   queryKey: ["faculty"],
  //   queryFn: getFacultyData,
  // });
  // console.log(data, error);

  return <div>test</div>;

  // return (
  //   <div className="flex flex-col items-center mt-8 space-y-6">
  //     {facultyData.map((faculty: GroupMember) => {
  //       const { Name, Position, Description, Education, Licenses, Image } =
  //         faculty;
  //
  //       return (
  //         <Card className="max-w-4xl w-full shadow-lg p-6 flex space-x-6">
  //           <Avatar className="w-32 h-32">
  //             {Image?.formats?.thumbnail?.url ? (
  //               <AvatarImage
  //                 src={`http://localhost:1337${Image?.formats?.thumbnail?.url}`}
  //                 alt={Name}
  //               />
  //             ) : (
  //               <AvatarFallback>{Name.charAt(0)}</AvatarFallback>
  //             )}
  //           </Avatar>
  //           <div>
  //             <h1 className="text-red-700 font-bold text-2xl">{Name}</h1>
  //             <h2 className="italic text-gray-600 text-xl">{Position}</h2>
  //             <div className="mt-4">
  //               <h3 className="text-lg font-semibold">Education</h3>
  //               <div
  //                 className="mt-2 text-sm text-gray-700"
  //                 dangerouslySetInnerHTML={{ __html: Education }}
  //               />
  //             </div>
  //             <div className="mt-4">
  //               <h3 className="text-lg font-semibold">Certificates/Licenses</h3>
  //               <div
  //                 className="mt-2 text-sm text-gray-700"
  //                 dangerouslySetInnerHTML={{ __html: Licenses }}
  //               />
  //             </div>
  //             <div className="mt-4 text-gray-800">
  //               <p>{Description}</p>
  //             </div>
  //           </div>
  //         </Card>
  //       );
  //     })}
  //   </div>
  // );
}

import { json, useLoaderData } from "@remix-run/react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getFacultyData, getPageBySlug } from "../utils/api";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeaderBreadcrumb } from "~/components/HeaderBreadcrumb";
import { ComponentManager } from "~/components/DynamicComponent";

export async function loader({ params }: any) {
  const facultyData = await getFacultyData();
  const slug = params["*"] ?? "home";
  const page = await getPageBySlug(slug);

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    facultyData,
    page,
  });
}

export default function DynamicPage() {
  const { page, slug, params } = useLoaderData() as any;
  const { Title, Content } = page?.attributes;

  return (
    <div className="h-[100vh]">
      <div className="w-full flex flex-col gap-4 items-center justify-center bg-neutral-700 h-[150px]">
        <h1 className="text-5xl text-white kadwa-regular">{Title}</h1>
        <HeaderBreadcrumb />
      </div>
      <ComponentManager blocks={Content} />
    </div>
  );
}

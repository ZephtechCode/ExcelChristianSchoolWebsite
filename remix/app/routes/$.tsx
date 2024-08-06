import { json, useLoaderData } from "@remix-run/react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getFacultyData,  getPageBySlug } from "../utils/api";

export async function loader({ params }: any) {
  const facultyData = await getFacultyData();
  const slug = params["*"] || "home";
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
  const { page } = useLoaderData() as any;
  const { Title, Content } = page?.attributes;

  return (
    <div>
      <h1>{Title}</h1>
      <BlocksRenderer content={Content}/>
    </div>
  );
}

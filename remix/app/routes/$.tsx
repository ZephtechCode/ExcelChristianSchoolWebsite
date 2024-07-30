import { json, useLoaderData } from "@remix-run/react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export async function loader({ params }: any) {
  const slug = params["*"] || "home";
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    }
  );
  const data = await response.json();

  if (data.data.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(data.data[0]);
}

export default function DynamicPage() {
  const page = useLoaderData() as any;
  const { Title, Content } = page?.attributes;

  return (
    <div>
      <h1>{Title}</h1>
      <BlocksRenderer content={Content} />
    </div>
  );
}

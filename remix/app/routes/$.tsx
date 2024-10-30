import { json, useLoaderData } from "@remix-run/react";
import { getPageBySlug } from "~/utils/api";
import { HeaderBreadcrumb } from "~/components/HeaderBreadcrumb";
import componentMap from "~/utils/componentMap";

// Define a generalized Page interface
export interface Page {
  id: number;
  Title: string;
  Content: ContentBlock[];
}

// Define a ContentBlock interface to allow for different data structures
export interface ContentBlock {
  id: number;
  __component: string;
  componentName: string;
  [key: string]: any; // Flexibility to accommodate various data structures
}
export async function loader({ params }: any) {
  const slug = params["*"] ?? "home";
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    throw new Response("Not Found", { status: 404 });
  }

  const processedContent = pageData.Content.map((block: any) => {
    const Component = componentMap[block.__component];

    if (Component) {
      if (Component.processBlockData) {
        const processedBlock = {
          ...block,
          ...Component.processBlockData(block),
        };
        return processedBlock;
      } else {
      }
    } else {
    }
    return block;
  });


  return json({
    page: {
      id: pageData.id,
      Title: pageData.Title ?? "Untitled Page",
      Content: processedContent,
    },
  });
}
export default function DynamicPage() {
  const { page } = useLoaderData<{ page: Page }>();

  return (
    <div className="h-[100vh] bg-[#F4F4E8]">
      <div className="w-full flex flex-col gap-4 items-center justify-center bg-neutral-700 h-[150px]">
        <h1 className="text-5xl text-white kadwa-regular">{page.Title}</h1>
        <HeaderBreadcrumb />
      </div>
      <div>
        {page.Content && page.Content.length > 0 ? (
          page.Content.map((block, index) => {
            const Component = componentMap[block.__component];
            if (Component) {
              return <Component key={block.id + index || index} {...block} />;
            }
            return <div key={block.id + index || index}>Unknown component</div>;
          })
        ) : (
          <div className="text-3xl kadwa-regular flex my-4 items-center justify-center">
            Uh-oh, There is no content available for this page
          </div>
        )}
      </div>
    </div>
  );
}

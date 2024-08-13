import { json, useLoaderData } from "@remix-run/react";
import { getPageBySlug } from "~/utils/api";
import { HeaderBreadcrumb } from "~/components/HeaderBreadcrumb";
import componentMap from "~/components/componentMap";

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
    console.log("Processing block:", block);
    const Component = componentMap[block.__component];
    
    if (Component) {
      console.log(`Found component for ${block.__component}`);
      if (Component.processBlockData) {
        console.log(`Processing data for ${block.__component}`);
        const processedBlock = {
          ...block,
          ...Component.processBlockData(block),
        };
        console.log("Processed block:", processedBlock);
        return processedBlock;
      } else {
        console.log(`No processBlockData method for ${block.__component}`);
      }
    } else {
      console.log(`No component found for ${block.__component}`);
    }
    return block;
  });

  console.log("Final processed content:", processedContent);

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
    <div className="h-[100vh]">
      <div className="w-full flex flex-col gap-4 items-center justify-center bg-neutral-700 h-[150px]">
        <h1 className="text-5xl text-white kadwa-regular">{page.Title}</h1>
        <HeaderBreadcrumb />
      </div>
      <div>
        {page.Content && page.Content.length > 0 ? (
          page.Content.map((block, index) => {
            const Component = componentMap[block.__component];
            console.log("Rendering block:", block);
            if (Component) {
              return <Component key={block.id || index} {...block} />;
            }
            return <div key={block.id || index}>Unknown component</div>;
          })
        ) : (
          <div>No content available</div>
        )}
      </div>
    </div>
  );
}

import { json, useLoaderData } from "@remix-run/react";
import { getPageBySlug } from "~/utils/api";
import { HeaderBreadcrumb } from "~/components/HeaderBreadcrumb";
import componentMap from '~/components/componentMap';

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
  [key: string]: any;  // Flexibility to accommodate various data structures
}

// Loader function to fetch and process page data
export async function loader({ params }: any) {
  const slug = params["*"] ?? "home";
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    throw new Response("Not Found", { status: 404 });
  }

  // Process each block in the content array
  const processedContent = pageData.Content.map((block: ContentBlock) => {
    const processedBlock = { ...block }; // Shallow copy to avoid mutating the original block

    // Handle specific component cases if needed
    switch (block.__component) {
      case 'macro-components.profile-list':
        processedBlock.profiles = block.profiles?.data?.map((profile: any) => ({
          id: profile.id,
          ...profile.attributes,
        })) ?? [];
        break;

      // Add more cases as necessary for other components
      default:
        // Default processing for blocks that don't need special handling
        break;
    }

    return processedBlock;
  });

  // Return the processed page data
  return json({
    page: {
      id: pageData.id,
      Title: pageData.Title ?? "Untitled Page",
      Content: processedContent,
    },
  });
}

// DynamicPage component to render the content dynamically
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
            const Component = componentMap[block.componentName];  // Find the component from the map

            if (Component) {
              return <Component key={block.id} {...block} />;  // Render the component if found
            }
            return <div key={block.id}>Unknown component</div>;  // Fallback for unknown components
          })
        ) : (
          <div>No content available</div>
        )}
      </div>
    </div>
  );
}

import { json, useLoaderData } from "@remix-run/react";
import { getPageBySlug } from "~/utils/api";
import { HeaderBreadcrumb } from "~/components/HeaderBreadcrumb";
import componentMap from '~/components/ComponentMap';

export interface Page {
  id: number;
  Title: string;
  Content: {
    id: number;
    __component: string;
    componentName: string;
    profiles?: any[];
    [key: string]: any;  // Allow for different data structures
  }[];
}

export async function loader({ params }: any) {
  const slug = params["*"] ?? "home";
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    throw new Response("Not Found", { status: 404 });
  }

  console.log("Page Data in Loader:", pageData);

  const page = {
    id: pageData.id,
    Title: pageData.Title ?? "Untitled Page",
    Content: pageData.Content.map((block) => {
      switch (block.__component) {
        case 'macro-components.profile-list': {
          const profiles = block.profiles?.data?.map((profile: any) => ({
            id: profile.id,
            ...profile.attributes,
          })) ?? [];

          return {
            ...block,
            profiles,
          };
        }
        // Add other cases for different components as needed
        case 'macro-components.another-component': {
          // Process data for another component
          return block; // Just an example, adjust as necessary
        }
        default: {
          return block; // Return block as-is for components not requiring special processing
        }
      }
    }),
  };

  return json({
    page,
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
            const Component = componentMap[block.componentName];  // Find the component from the map
            if (Component) {
              return <Component key={index} {...block} />;  // Render the component if found
            }
            return <div key={index}>Unknown component</div>;  // Fallback for unknown components
          })
        ) : (
          <div>No content available</div>
        )}
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { useLoaderData } from "@remix-run/react";

type Page = {
  Slug: string;
  Title: string;
};

type SitemapData = {
  pageData: {
    [key: number]: {
      Slug: string;
      Title: string;
    };
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
};

export default function Sitemap() {
  const data = useLoaderData() as SitemapData;

  const { pageData } = data;

  const Pages: Page[] = Object.values(pageData).filter(
    (page) => typeof page === "object" && "Slug" in page
  );

  return (
    <div className="bg-red-800 text-white pt-4">
      <div className="container mx-auto px-4">
        <Card className="bg-red-800 text-white border-none">
          <CardContent>
            {Pages && Pages.length > 0 ? (
              <ul className="flex justify-around">
                {Pages.map((page, index) => (
                  <li key={index}>
                    <a href={`/${page.Slug}`} className="hover:underline">
                      {page.Title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pages available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { useLoaderData } from "@remix-run/react";

type Page = {
  Slug: string;
  Title: string;
  Parent?: Page | null;
  Children?: Page[];
};

type SitemapData = {
  pageData: {
    [key: number]: Page;
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

export default function Sitemap() {
  const { pageData } = useLoaderData<SitemapData>();

  // Enhanced filtering to ensure only valid pages are included
  const Pages: Page[] = Object.values(pageData).filter(
    (page) =>
      page &&
      typeof page === "object" &&
      !page.Parent &&
      "Slug" in page &&
      "Title" in page
  );

  // Log any pages that were excluded for debugging purposes
  const invalidPages = Object.values(pageData).filter(
    (page) =>
      !page ||
      typeof page !== "object" ||
      !("Slug" in page) ||
      !("Title" in page)
  );

  return (
    <div className="bg-red-800 text-white pt-4">
      <div className="container mx-auto px-4">
        <Card className="bg-red-800 text-white border-none">
          <CardContent>
            <ul className="flex justify-around ">
              {Pages.map((page, index) => (
                <li key={index}>
                  <a href={`/${page.Slug}`} className="hover:underline">
                    {page.Title}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "@/components/ui/nav-button";

type Page = {
  Slug: string;
  Title: string;
  Parent?: { Slug: string } | null;
  Children?: Page[];
};

type NavData = {
  pageData: { [key: number]: Page };
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export default function Nav() {
  const data = useLoaderData() as NavData;
  const { pageData } = data;

  const isPageValid = (page: Page): page is Page =>
    page && typeof page === "object" && "Slug" in page && "Title" in page;

  const rootPages: Page[] = Object.values(pageData).filter(
    (page) => isPageValid(page) && !page.Parent
  );

  rootPages.forEach((rootPage) => {
    rootPage.Children = Object.values(pageData).filter(
      (page) =>
        isPageValid(page) && page.Parent && page.Parent.Slug === rootPage.Slug
    );
  });

  return (
    <NavigationMenu className="bg-red-800 text-white p-0">
      <NavigationMenuList className="w-screen">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {rootPages.map((page) =>
          page.Children && page.Children.length > 0 ? (
            <Link to={`/${page.Slug}`} key={page.Slug}>
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger>{page.Title}</NavigationMenuTrigger>
              <NavigationMenuContent className="mt-[-10px]">
                <ul>
                  {page.Children.map((child) => (
                    <Button key={child.Slug}>
                      <Link to={`/${page.Slug}/${child.Slug}`}>
                        {child.Title}
                      </Link>
                    </Button>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            </Link>
          ) : (
            <NavigationMenuItem key={page.Slug}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={`/${page.Slug}`}>{page.Title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

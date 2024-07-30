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
type MenuItem = {
  id: number;
  Label: string;
  URL: string;
  External: boolean;
  Order: number;
  Parent: string | null;
  children?: MenuItem[];
};

function assembleMenuItems(items: MenuItem[]): MenuItem[] {
  const itemMap = new Map<string, MenuItem>();
  const rootItems: MenuItem[] = [];

  items.forEach((item) => {
    itemMap.set(item.Label.toString(), { ...item, children: [] });
  });

  items.forEach((item) => {
    const menuItem = itemMap.get(item.Label.toString())!;
    if (item.Parent) {
      const parent = itemMap.get(item.Parent);
      if (parent) {
        parent.children!.push(menuItem);
      } else {
        rootItems.push(menuItem);
      }
    } else {
      rootItems.push(menuItem);
    }
  });

  return sortMenuItems(rootItems);
}

function sortMenuItems(items: MenuItem[]): MenuItem[] {
  return items
    .sort((a, b) => a.Order - b.Order)
    .map((item) => ({
      ...item,
      children: item.children ? sortMenuItems(item.children) : undefined,
    }));
}

function renderMenuItem(item: MenuItem) {
  if (item.External) {
    return (
      <a href={item.URL} target="_blank" rel="noopener noreferrer">
        {item.Label}
      </a>
    );
  }
  return <Link to={item.URL}>{item.Label}</Link>;
}

export default function Nav() {
  const data = useLoaderData() as any;
  const { MenuItem } = data.attributes;
  const navigation = assembleMenuItems(MenuItem);
  return (
    <div className="w-full">
      <NavigationMenu>
        <NavigationMenuList className="w-screen">
          {navigation.map((item: MenuItem) => (
            <NavigationMenuItem>
              {item.children!.length > 0 ? (
                <>
                  <NavigationMenuTrigger>{item.Label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"></ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link to={item.URL}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.Label}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "@remix-run/react";
import React from "react";

const constructBreadCrumbs = (path: string) => {
  const parts: string[] = path.split("/").filter((a) => a);
  return parts.map((part, index) => ({
    path: "/" + parts.slice(0, index + 1).join("/"),
    title: capitalizeAllWords(part.replace("-", " ")),
  }));
};

const capitalizeAllWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function HeaderBreadcrumb() {
  const location = useLocation();
  const breadcrumbs = constructBreadCrumbs(location.pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, i) => (
          <React.Fragment key={breadcrumb.title}>
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb.path}>
                {breadcrumb.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

import { useLoaderData } from "@remix-run/react";

export default function Nav() {
  const data = useLoaderData() as any;
  console.log({ data });
  return <nav>Nav</nav>;
}

import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./globals.css";
import Nav from "./components/Nav";

export async function loader() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/navigation?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  if (data.data.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(data.data);
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

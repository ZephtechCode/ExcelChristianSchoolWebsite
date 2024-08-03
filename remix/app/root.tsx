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
import Hero from "./components/Hero";

export async function loader() {
  const navigation = await fetch(
    `${process.env.STRAPI_URL}/api/navigation?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    }
  );
  const contactInfo = await fetch(
    `${process.env.STRAPI_URL}/api/contact-info?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    }
  );
  const navigationData = await navigation.json();
  if (navigationData.data.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }
  const contactInfoData = await contactInfo.json();
  if (navigationData.data.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    navigation: navigationData.data,
    contactInfo: contactInfoData.data,
  });
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
        <Hero />
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

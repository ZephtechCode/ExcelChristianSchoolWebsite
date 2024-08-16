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
import { getContactData, getPages } from "./utils/api";
import Footer from "./components/Footer";
import Sitemap from "./components/Sitemap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export async function loader() {
  const [contactInfo, pageData] = await Promise.all([
    getContactData(),
    getPages(),
  ]);
  console.log(process.env.STRAPI_URL);
  return json({
    contactInfo,
    pageData,
    strapiUrl: process.env.STRAPI_URL,
  });
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Hero />
          <Nav />
          <main>
            <Outlet />
          </main>
          <Footer />
          <Sitemap />
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}

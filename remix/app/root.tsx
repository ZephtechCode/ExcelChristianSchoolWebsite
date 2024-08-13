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
  const contactInfo = await getContactData();
  const pageData = await getPages();
  console.log("Contact Info:", contactInfo);
  return json({
    contactInfo,
    pageData,
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
          <Outlet />
          <Footer />
          <Sitemap />
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}

// export default function App() {
//   return <Outlet />;
// }

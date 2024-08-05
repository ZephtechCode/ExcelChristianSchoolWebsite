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
import { getContactData, getNavData, getPages} from "./utils/api";
import Footer from "./components/Footer";
import Sitemap from "./components/Sitemap";

export async function loader() {
    let navData = await getNavData();
    let contactInfo = await getContactData();
    let pageData = await getPages();
    return json({
      navData,
      contactInfo,
      pageData,
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
        <Footer/>
        <Sitemap />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

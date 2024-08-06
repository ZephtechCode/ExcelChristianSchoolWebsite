import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoaderData } from "@remix-run/react";

type FooterData = {
  Name: string;
  Address: string;
  Phone: string;
  Fax: string;
  SupportEmail: string;
  MapLink: string;
  Accreditations: { ImgSrc: string; Alt: string; Link: string }[];
};

export default function Footer() {
  const data = useLoaderData() as { contactInfo: FooterData };
  const { Name, Address, Phone, Fax, SupportEmail, Accreditations, MapLink } =
    data.contactInfo;
  return (
    <footer className="bg-slate-700 text-white py-8">
      <div className="container mx-auto px-4 flex justify-between">
        <Card className="bg-slate-700 text-white border-none">
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{Name}</p>
            <p>{Address}</p>
            <p>Phone: {Phone}</p>
            <p>Fax: {Fax}</p>
            <p>Email: {SupportEmail}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-700 text-white border-none ">
          <CardHeader>
            <CardTitle>Map</CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              src={MapLink}
              width="300"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </CardContent>
        </Card>
        <Card className="bg-slate-700 text-white border-none">
          <CardHeader>
            <CardTitle>Fully Accredited By</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              {Accreditations.map((acc, index) => (
                <a href={acc.Link} key={index}>
                  <img
                    key={index}
                    src={acc.ImgSrc}
                    alt={acc.Alt}
                    className="h-10"
                  />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
     
    </footer>
  );
}

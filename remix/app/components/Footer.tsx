import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoaderData } from "@remix-run/react";

// Define types for the FooterData and its properties
interface Accreditation {
  ImgSrc: string;
  Alt: string;
  Link: string;
}

interface FooterData {
  Name: string;
  Address: string;
  Phone: string;
  Fax: string;
  SupportEmail: string;
  MapLink: string;
  Accreditations: Accreditation[];
}

// Footer component definition
const Footer: FC = () => {
  const { contactInfo } = useLoaderData<{ contactInfo: FooterData }>();

  const {
    Name,
    Address,
    Phone,
    Fax,
    SupportEmail,
    Accreditations,
    MapLink,
  } = contactInfo;

  // Render accreditations list or a fallback message
  const renderAccreditations = () => (
    Array.isArray(Accreditations) && Accreditations.length > 0 ? (
      Accreditations.map(({ ImgSrc, Alt, Link }, index) => (
        <a href={Link} key={index}>
          <img
            src={ImgSrc}
            alt={Alt}
            className="h-10"
          />
        </a>
      ))
    ) : (
      <p>No accreditations available</p>
    )
  );

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
        <Card className="bg-slate-700 text-white border-none">
          <CardHeader>
            <CardTitle>Map</CardTitle>
          </CardHeader>
          <CardContent>
            {MapLink ? (
              <iframe
                src={MapLink}
                width="300"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location Map"
              ></iframe>
            ) : (
              <p>No map available</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-slate-700 text-white border-none">
          <CardHeader>
            <CardTitle>Fully Accredited By</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              {renderAccreditations()}
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;

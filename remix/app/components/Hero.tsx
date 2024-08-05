import logo from "../images/Excel-small-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useLoaderData } from "@remix-run/react";

type ContactInfo = {
  Phone: string;
  SupportEmail: string;
};

type ContactDetailProps = {
  icon: IconDefinition;
  title: string;
  link: string;
  children: React.ReactNode;
};

const ContactDetail: React.FC<ContactDetailProps> = ({ icon, title, link, children }) => (
  <div className="flex gap-4 items-center">
    <FontAwesomeIcon icon={icon} size="2x" className="text-red-800" />
    <div>
      <h2 className="kadwa-regular text-lg">{title}</h2>
      <a href={link}>
        <h3 className="underline">{children}</h3>
      </a>
    </div>
  </div>
);

export default function Hero() {
  const data = useLoaderData() as { contactInfo: ContactInfo };
  const { Phone, SupportEmail } = data.contactInfo;

  return (
    <div className="flex p-8 pb-4 items-center justify-between text-gray-600">
      <div className="flex items-center">
        <img src={logo} className="mx-5" alt="Excel Christian School Logo" />
        <div>
          <h1 className="text-4xl kadwa-bold">Excel Christian School</h1>
          <h4 className="text-lg">Excellence & Faith in Education</h4>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-10">
          <ContactDetail icon={faPhone} title="Phone Number" link={`tel:${Phone}`}>
            {Phone}
          </ContactDetail>
          <ContactDetail icon={faEnvelope} title="Email Address" link={`mailto:${SupportEmail}`}>
            {SupportEmail}
          </ContactDetail>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-4">
            <a href="https://www.facebook.com/excelchristianschool">
              <FontAwesomeIcon icon={faFacebook} size="2x" className="text-red-800 hover:text-gray-600" />
            </a>
            <a href="https://www.instagram.com/excel_warriors">
              <FontAwesomeIcon icon={faInstagram} size="2x" className="text-red-800 hover:text-gray-600" />
            </a>
            <a href="https://x.com/ExcelSparks">
              <FontAwesomeIcon icon={faSquareXTwitter} size="2x" className="text-red-800 hover:text-gray-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import logo from "../images/Excel-small-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useLoaderData } from "@remix-run/react";

export default function Hero() {
  const data = useLoaderData() as any;
  const { Phone, SupportEmail } = data.contactInfo.attributes;
  return (
    <div className="flex p-8 items-center justify-between text-gray-600">
      <div className="flex items-center">
        <img src={logo} className="mx-5" />
        <div>
          <h1 className="text-4xl kadwa-bold ">Excel Christian School</h1>
          <h4 className="text-lg">Excellence & Faith in Education</h4>
        </div>
      </div>
      <div className="flex justify-between items-center gap-10">
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faPhone} size="2x" className="text-red-800" />
          <div>
            <h2 className="kadwa-regular text-lg ">Phone Number</h2>

            <a href={`tel:${Phone}`}>
              <h3 className="underline">{Phone}</h3>
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="2x"
            className="text-red-800"
          />
          <div>
            <h2 className="kadwa-regular text-lg">Email Address</h2>
            <a href={`mailto:${SupportEmail}`}>
              <h3 className="underline">{SupportEmail}</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

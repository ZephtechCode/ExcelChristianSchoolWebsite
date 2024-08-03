import logo from "../images/Excel-small-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Hero() {
  return (
    <div className="flex p-8 items-center justify-between text-gray-600">
      <div className="flex items-center">
        <img src={logo} className="mx-5" />
        <div>
          <h1 className="text-4xl kadwa-bold ">
            Excel Christian School
          </h1>
          <h4 className="text-lg">Excellence & Faith in Education</h4>
        </div>
      </div>
      <div className="flex justify-between items-center gap-10">
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faPhone} size="3x" className="text-red-800" />
          <h2 className="kadwa-regular text-xl ">Phone Number</h2>
        </div>
        <div className="flex gap-4">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="3x"
            className="text-red-800"
          />
          <h2 className="kadwa-regular text-xl">Email Address</h2>
        </div>
      </div>
    </div>
  );
}

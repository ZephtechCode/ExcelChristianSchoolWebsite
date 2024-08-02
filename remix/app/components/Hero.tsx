import logo from "../images/Excel-small-logo.png";
export default function Hero() {
  return (
    <div className="flex p-8 items-center">
      <img src={logo} className="mx-5" />
      <div>
        <h1 className="text-4xl kadwa-bold text-gray-600">
          Excel Christian School
        </h1>
        <h4 className="text-lg">Excellence & Faith in Education</h4>
        <div></div>
      </div>
    </div>
  );
}

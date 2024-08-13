import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import { FaBook, FaCoffee, FaUser } from "react-icons/fa";

// Define the icon map
const iconMap: Record<string, IconType> = {
  FaBook: FaBook,
  FaCoffee: FaCoffee,
  FaUser: FaUser,
};

interface ButtonFrameProps {
  icon?: string;
  label: string;
  url?: string;
}

const ButtonFramed: FC<ButtonFrameProps> & { processBlockData?: (block: any) => ButtonFrameProps } = ({ icon, label, url }) => { 
  const IconComponent = icon ? iconMap[icon] : undefined;

  return (
    <Button
      className="bg-transparent border-2 border-red-700 text-red-700 flex items-center"
      onClick={() => {
        if (url) {
          window.location.href = url;
        }
      }}
    >
      {IconComponent && <IconComponent className="mr-2" />}
      {label}
    </Button>
  );
};

// Define the processBlockData method
ButtonFramed.processBlockData = (block: any) => {
  return {
    icon: block.Icon,  // This can be undefined
    label: block.Label,
    url: block.URL,
  };
};

export default ButtonFramed;

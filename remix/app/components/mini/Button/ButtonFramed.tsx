import { FC } from 'react';
import { Button } from "@/components/ui/button";
import iconMap from '~/utils/iconMap';

interface ButtonFrameProps {
  icon?: string;
  label: string;
  url?: string;
}

const ButtonFramed: FC<ButtonFrameProps> & { processBlockData?: (block: any) => ButtonFrameProps } = ({ icon, label, url }) => { 
  const IconComponent = icon ? iconMap[icon] : undefined;

  return (
    <Button
      className="bg-transparent border-2 border-red-700 text-red-700 flex items-center hover:bg-neutral-700 hover:text-white hover:border-neutral-700" 
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

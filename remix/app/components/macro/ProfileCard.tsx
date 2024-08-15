import React, { FC } from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Interfaces for Image formats and Profile structure
interface ImageFormat {
  url: string;
}

interface PortraitAttributes {
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  url?: string;
}

interface Profile {
  id: number;
  Name: string;
  Position: string;
  Bio: string;
  EducationCertsAndLicenses?: {
    Education: string[];
    "Certificates/Licenses": string[];
  };
  Portrait?: {
    data?: {
      attributes?: PortraitAttributes;
    };
  };
}

interface ProfileCardProps {
  profiles: Profile[];
}

// Helper function to get the best available image URL
const getBestImageUrl = (portrait?: PortraitAttributes): string | null => {
  if (!portrait?.formats) return portrait?.url ?? null;

  const formatOrder: Array<keyof typeof portrait.formats> = ["large", "medium", "small", "thumbnail"];

  for (const format of formatOrder) {
    if (portrait.formats[format]?.url) {
      return portrait.formats[format]?.url;
    }
  }

  return portrait.url ?? null; // Fallback to the base URL if no format is available
};

// ProfileCard component
const ProfileCard: FC<ProfileCardProps> & { processBlockData?: (block: any) => ProfileCardProps } = ({ profiles }) => {
  if (!profiles || profiles.length === 0) {
    return <div>No profiles available</div>;
  }

  return (
    <div className="flex flex-col items-center mt-8 space-y-6">
      {profiles.map(({ id, Name, Position, Bio, EducationCertsAndLicenses, Portrait }) => (
        <Card key={id} className="max-w-4xl w-full shadow-lg p-6 flex space-x-6">
          <Avatar className="w-32 h-32">
            {Portrait?.data?.attributes && getBestImageUrl(Portrait.data.attributes) ? (
              <AvatarImage
                src={`process.env.STRAPI_URL${getBestImageUrl(Portrait.data.attributes)}`}
                alt={Name}
                className="object-cover" // Ensures the image maintains its aspect ratio
              />
            ) : (
              <AvatarFallback>{Name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col justify-center">
            <h1 className="text-red-700 font-bold text-2xl">{Name}</h1>
            <h2 className="italic text-gray-600 text-xl">{Position}</h2>
            {EducationCertsAndLicenses && (
              <div className="mt-4 text-gray-800">
                <h3 className="font-bold">Education</h3>
                <ul className="list-disc list-inside">
                  {EducationCertsAndLicenses.Education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
                <h3 className="font-bold mt-2">Certificates/Licenses</h3>
                <ul className="list-disc list-inside">
                  {EducationCertsAndLicenses["Certificates/Licenses"].map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 text-gray-800">
              <p>{Bio}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Static method for processing block data for this component
ProfileCard.processBlockData = (block: any) => {
  return {
    profiles: block.profiles?.data?.map((profile: any) => ({
      id: profile.id,
      ...profile.attributes,
    })) ?? [],
  };
};

export default ProfileCard;

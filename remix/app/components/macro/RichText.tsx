import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const RichText = ({ Content }: any) => {
  return <BlocksRenderer content={Content} />;
};

import { FC } from "react";
import ProfileCard from "~/components/macro/ProfileCard";
import ButtonFramed from "~/components/mini/Button/ButtonFramed";
import { RichText } from "../components/macro/RichText";

interface ComponentMap {
  [key: string]: FC<any> & { processBlockData?: (block: any) => any };
}

const componentMap: ComponentMap = {
  // Macro components
  "macro-components.profile-card": ProfileCard,
  "macro-components.rich-text": RichText,

  // Mini components
  "mini-components.button-framed": ButtonFramed,
};

export default componentMap;

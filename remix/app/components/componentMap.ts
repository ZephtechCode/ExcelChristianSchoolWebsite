import { FC } from "react";
import ProfileList from "~/components/macro/ProfileList";
import ButtonFramed from "~/components/mini/Button/ButtonFramed";
import { RichText } from "./macro/RichText";

interface ComponentMap {
  [key: string]: FC<any> & { processBlockData?: (block: any) => any };
}

const componentMap: ComponentMap = {
  // Macro components
  "macro-components.profile-list": ProfileList,
  "macro-components.rich-text": RichText,
  // Mini components
  "mini-components.button-framed": ButtonFramed,
};

export default componentMap;

import React from "react";
import { AdminStaffList } from "./macro/AdminStaffList";

export const DynamicComponent = (
  { __component, ...rest }: any,
  index: number
) => {
  let Block;

  switch (__component) {
    case "macro.admin-staff-list":
      Block = AdminStaffList;
      break;
  }

  return Block ? <Block key={`index-${index}`} {...rest} /> : null;
};

export const ComponentManager = ({ blocks }: any) => {
  console.log({ blocks });
  return blocks.map(DynamicComponent);
};

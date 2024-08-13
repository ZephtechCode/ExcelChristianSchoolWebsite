import React from 'react';
import componentMap from '~/components/componentMap'; // Import your component map

interface DynamicComponentRendererProps {
  componentName: string;
  props: any;
}

export const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({ componentName, props }) => {
  const Component = componentMap[componentName];

  if (!Component) {
    console.error(`Component "${componentName}" not found in the map.`);
    return null;
  }

  // Pass the props, which now includes profiles, to the component
  return <Component {...props} />;
};

import { FC } from 'react';
import ProfileList from '~/components/macro/ProfileList';

// Define the interface for the component map
interface ComponentMap {
  [key: string]: FC<any>; // Maps component names to their respective React functional components
}

// Create the component map
const componentMap: ComponentMap = {
  ProfileList, // No need to repeat `ProfileList: ProfileList` in ES6
};

export default componentMap;

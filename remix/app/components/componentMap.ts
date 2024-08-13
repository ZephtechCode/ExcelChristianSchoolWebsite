import ProfileList from '~/components/macro/ProfileList';

import { FC } from 'react';

interface ComponentMap {
  [key: string]: FC<any>; // This indicates that each component is a functional component that accepts any props
}

const componentMap: ComponentMap = {
  ProfileList: ProfileList,
};

export default componentMap;

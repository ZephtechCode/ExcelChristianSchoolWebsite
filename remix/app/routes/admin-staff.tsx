import { json } from '@remix-run/react';
import React from 'react';
import { EnumerativeCards } from '~/templates';
import { getFacultyData } from '~/utils/api';

export async function loader() {
    const facultyData = await getFacultyData();
  
    return json({facultyData});
  }

const AdminStaff: React.FC = () => {
    return (
        
        <div>
            <EnumerativeCards />
        </div>
    );
};

export default AdminStaff;
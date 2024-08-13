import React from 'react';

interface Profile {
  id: number;
  Name: string;
  Position: string;
  Bio: string;
}

interface ProfileListProps {
  profiles: Profile[];
}

const ProfileList: React.FC<ProfileListProps> = ({ profiles }) => {


  if (!profiles || profiles.length === 0) {
    return <div>No profiles available</div>;
  }

  return (
    <div>
      <h2>Profile List</h2>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id}>
            <h3>{profile.Name}</h3>
            <p>{profile.Position}</p>
            <p>{profile.Bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
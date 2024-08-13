import React from 'react';

interface Profile {
  id: number;
  name: string;
  title: string;
}

interface ProfileListProps {
  profiles: Profile[];
}

const ProfileList: React.FC<ProfileListProps> = ({ profiles }) => {
  console.log("Profiles in ProfileList Component:", profiles); // Log to see if profiles are received

  if (!profiles || profiles.length === 0) {
    return <div>No profiles available</div>;
  }

  return (
    <div>
      <h2>Profile List</h2>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id}>
            <h3>{profile.name}</h3>
            <p>{profile.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;

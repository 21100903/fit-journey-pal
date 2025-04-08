
import React from 'react';
import MobileLayout from '@/components/Layout/MobileLayout';
import UserProfile from '@/components/Profile/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <MobileLayout>
      <div className="bg-fitness-primary text-white p-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-white/80">Manage your account settings</p>
      </div>
      <UserProfile />
    </MobileLayout>
  );
};

export default ProfilePage;

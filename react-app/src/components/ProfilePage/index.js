import React from 'react';
import ProfileDescriptionCard from '../ProfileDescriptionCard';
import "./ProfilePage.css";
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const sessionUser = useSelector(state => state.user);

  return (
    <div>
      <div>
        <ProfileDescriptionCard />
      </div>

    </div>
  )
};

export default ProfilePage;

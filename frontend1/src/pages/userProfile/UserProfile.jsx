import React from "react";
import UserAppBar from "../../components/userAppBar/UserAppBar";
import UserCoverChange from "../../components/userCoverChange/UserCoverChange";
import UserProfileDetails from "../../components/userProfileDetails/UserProfileDetails";
import UserProfileSettings from "../../components/userProfileSettings/UserProfileSettings";
import UserSideBar from "../../components/userSideBar/userSideBar";

function UserProfile() {
  return (
    <>
      <UserSideBar />
      <UserAppBar />
      <UserCoverChange />
      <UserProfileDetails />
      <UserProfileSettings />
    </>
  );
}

export default UserProfile;

import EditDeleteAccount from "../components/MyProfile/EditDeleteAccount.js";
import HouseMembersBoxComponent from "../components/MyProfile/HouseMembersBoxComponent.js";
import EditLockPassword from "../components/MyProfile/EditLockPasswordComponent.js";
import { useState } from "react";

function MyProfile() {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(false);
  
  const handleConfirmation = (status) => {
    setConfirmationStatus(status)
    setEditProfileOpen(false)
  };

  return (
    <>
      <EditDeleteAccount setEditProfileOpen={setEditProfileOpen}/>
      <HouseMembersBoxComponent />
      <EditLockPassword/>
    </>
  );
}

export default MyProfile;

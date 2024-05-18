import { useState } from "react";
import EditDeleteAccount from "../components/MyProfile/EditDeleteAccount.js";
import PopUp from "../components/PopUp.js";
import ConfirmDelete from "../components/MyProfile/ConfirmDelete.js";
import HouseMembersBoxComponent from "../components/MyProfile/HouseMembersBoxComponent.js";

function MyProfile() {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(false);
  
  const handleConfirmation = (status) => {
    setConfirmationStatus(status)
    setEditProfileOpen(false)
  };

  return (
    <>
      <PopUp
        isOpen={editProfileOpen}
        setIsOpen={setEditProfileOpen}
        confirmationStatus={confirmationStatus}
      >
        <ConfirmDelete handleConfirmation={handleConfirmation} />
      </PopUp>
      <EditDeleteAccount
        setEditProfileOpen={setEditProfileOpen}
        confirmationStatus={confirmationStatus}
      />
      <HouseMembersBoxComponent />
    </>
  );
}

export default MyProfile;

import { useState } from "react";
import EditDeleteAccount from "../components/MyProfile/EditDeleteAccount.js";
import PopUp from "../components/PopUp.js";
import ConfirmDelete from "../components/MyProfile/ConfirmWithPassword.js";
import HouseMembersBoxComponent from "../components/MyProfile/HouseMembersBoxComponent.js";
import EditLockPassword from "../components/MyProfile/EditLockPasswordComponent.js";

function MyProfile() {

  return (
    <>
      <EditDeleteAccount/>
      <HouseMembersBoxComponent />
      <EditLockPassword/>
    </>
  );
}

export default MyProfile;

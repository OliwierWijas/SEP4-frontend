import { useState } from "react";
import EditDeleteAccount from "../components/MyProfile/EditDeleteAccount.js";
import PopUp from "../components/PopUp.js";
import ConfirmDelete from "../components/MyProfile/ConfirmWithPassword.js";
import HouseMembersBoxComponent from "../components/MyProfile/HouseMembersBoxComponent.js";

function MyProfile() {

  return (
    <>
      <EditDeleteAccount/>
      <HouseMembersBoxComponent />
    </>
  );
}

export default MyProfile;

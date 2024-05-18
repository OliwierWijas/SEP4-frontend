import EditDeleteAccount from "../components/MyProfile/EditDeleteAccount.js";
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

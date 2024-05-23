import EditDeleteAccount from "../components/MyProfile/EditDeleteAccount.js";
import HouseMembersBoxComponent from "../components/MyProfile/HouseMembersBoxComponent.js";
import EditLockPassword from "../components/MyProfile/EditLockPasswordComponent.js";
import { AuthContext } from "../auth/AuthContext.js";
import { useContext } from "react";

function MyProfile() {
  const { claims } = useContext(AuthContext)
  const isAuthenticated = Boolean(claims?.token);
  const isAdmin = Boolean(claims?.role === "Admin")

  return (
    <>
      {isAuthenticated && (
        <>
          <EditDeleteAccount />
          <HouseMembersBoxComponent />
          {isAdmin && (
            <EditLockPassword />
          )}
        </>
      )}
    </>
  );
}

export default MyProfile;

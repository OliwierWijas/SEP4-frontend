import { useState } from "react";
import EditDeleteAccount from "../components/MyProfile/EditDeleteAccount.js";
import PopUp from "../components/PopUp.js";
import ConfirmDelete from "../components/MyProfile/ConfirmDelete.js";

export default function MyProfile() {
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(false);

    const handleConfirmation = (status) => {
        setConfirmationStatus(status);
        setEditProfileOpen(false);
    };

    return (
        <>
            <PopUp isOpen={editProfileOpen} setIsOpen={setEditProfileOpen} confirmationStatus={confirmationStatus}>   
                <ConfirmDelete handleConfirmation={handleConfirmation} />
            </PopUp>
            <PopUp isOpen={confirmationStatus} setIsOpen={setConfirmationStatus}>
                <div className="h-30 w-100 text-white">
                    Account is deleted
                </div>
            </PopUp>
            <EditDeleteAccount setEditProfileOpen={setEditProfileOpen} confirmationStatus={confirmationStatus} />
        </>
    );
}

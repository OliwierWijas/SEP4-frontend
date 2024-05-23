import { FaRegEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PopUp from "../PopUp.js";
import { useNavigate } from "react-router-dom";
import ConfirmWithPassword from "./ConfirmWithPassword.js";
import { useEditUsername } from "../../hooks/auth/useEditUsername.js";
import { useEditPassword } from "../../hooks/auth/useEditPassword.js";
import { useDeleteAccount } from "../../hooks/auth/useDeleteAccount.js";
import { AuthContext } from "../../auth/AuthContext.js";

export default function EditDeleteAccount() {
  const { claims, setClaims } = useContext(AuthContext)
  const token = claims?.token
  const currentUsername = claims?.username
  const currentPassword = claims?.password

  const navigate = useNavigate();

  const [isVisible, toggleVisible] = useState(false)
  const [isEditing, toggleEditing] = useState(false)
  const [isPopup, togglePopup] = useState(false);

  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");

  const editUsername = useEditUsername()
  const editPassword = useEditPassword()
  const deleteAccount = useDeleteAccount()

  const handleSave = () => {
    if (isEditing) {
      const editedUsername = {
        newUsername,
        password: currentPassword
      }

      const editedPassword = {
        username: currentUsername,
        oldPassword: currentPassword,
        newPassword
      }

      if (currentUsername !== newUsername && newUsername !== '')
        editUsername(currentUsername, editedUsername, setClaims, token)
      if (currentPassword !== newPassword && newPassword !== '')
        editPassword(currentUsername, editedPassword, setClaims, token)
      handleEditing()
    } else {
      deleteAccount(currentUsername, currentPassword, setClaims, token)
      navigate("/")
    }

    handlePopup()
  }

  const handleVisible = () => {
    toggleVisible(!isVisible);
  }

  const handleEditing = () => {
    toggleEditing(!isEditing);
  }

  const handlePopup = () => {
    togglePopup(!isPopup);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmSave = () => {
    if (confirmPassword === currentPassword) {
      handleSave()
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <>
      <div className="brown-gradient-y h-400 w-full flex flex-col rounded-md shadow-md mb-10">
        <div
          className="min-h-24 w-full flex items-center justify-between text-2xl lg:text-4xl font-bold text-white"
          data-testid="state-info"
        >
          <div className="ml-5">{isEditing ? "EDIT" : "MY INFO"}</div>
          <div className="mr-5">
            {!isEditing ? (
              <FaRegEdit onClick={handleEditing} data-testid="toggleEditing" />
            ) : (
              <IoClose onClick={handleEditing} data-testid="closeEditing" />
            )}
          </div>
        </div>
        <div className="bg-white mb-2 bg-opacity-15 h-full w-full text-xs md:text-sm lg:text-base flex flex-col justify-start rounded-md overflow-y-auto">
          <div className="w-full flex flex-col mt-2">
            <div className="flex flex-row mt-3 mb-3 items-center">
              <div className="ml-2 flex w-1/7">Username:</div>
              <div
                className="w-full bg-white p-2 mr-2 ml-2"
                data-testid="username-div"
              >
                {isEditing ? (
                  <input
                    className="w-auto"
                    placeholder={"new username"}
                    data-testid="username-input"
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                ) : (
                  ` ${currentUsername}`
                )}
              </div>
            </div>
            <div className="flex flex-row mt-3 mb-3 items-center">
              <div className="ml-2 mr-1 flex w-1/7">Password:</div>
              <div
                className="relative p-2 mr-2 ml-2 w-full bg-white"
                data-testid="password-div"
              >
                {isEditing ? (
                  <input
                    className="w-auto"
                    type="password"
                    placeholder={"new password"}
                    data-testid="password-input"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                ) : (
                  <>
                    {isVisible ? ` ${currentPassword}` : "*".repeat(currentPassword?.length)}
                    <div className="absolute top-3 right-2">
                      {isVisible ? (
                        <FaRegEye
                          onClick={handleVisible}
                          data-testid="makevisible"
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={handleVisible}
                          data-testid="makeinvisible"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="m-3 p-2 w-9/10 flex justify-center">
            <button
              data-testid="savedelete"
              className="text-white w-1/4 py-2 px-4 rounded mt-4"
              style={{ backgroundColor: isEditing ? "#a79277" : "#FFA7A7" }}
              onClick={handlePopup}
            >
              {isEditing ? "SAVE" : "DELETE ACCOUNT"}
            </button>
          </div>
        </div>
      </div>
      <PopUp isOpen={isPopup} setIsOpen={togglePopup}>
        <ConfirmWithPassword
          isEditing={isEditing}
          handleSave={handleConfirmSave}
          newPassword={handleConfirmPasswordChange}
        />
      </PopUp>
    </>
  )
}

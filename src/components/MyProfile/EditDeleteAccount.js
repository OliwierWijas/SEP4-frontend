import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function EditDeleteAccount({ setEditProfileOpen}) {
  const [inputs, setInputs] = useState(["John", "john@dummy.com", "123123"]);
  const passwordSize = inputs[2].length;

  const [isVisible, toggleVisible] = useState(false);
  const [isEditing, toggleEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    const newinputs = [...inputs];

    if (name.trim() !== "") {
      newinputs[0] = name.trim();
    }

    if (email.trim() !== "") {
      newinputs[1] = email.trim();
    }

    if (password.trim() !== "") {
      newinputs[2] = password.trim();
    }

    setInputs(newinputs);
    handleEditing();

    //needs the hook of sending update info for profile
  };

  const handleVisible = () => {
    toggleVisible(!isVisible);
  };

  const handleEditing = () => {
    toggleEditing(!isEditing);
  };

  return (
    <>
      <div className="relative w-full h-auto shadow-lg rounded-md flex flex-col brown-gradient">
        <div className="h-auto w-full flex">
          <div className="h-auto w-2/3 flex justify-beginning m-3">
            {isEditing ? "Edit" : "My Info"}
          </div>
          <div className="h-auto w-1/3 flex justify-end m-3">
            {!isEditing ? (
              <FaRegEdit onClick={handleEditing} />
            ) : (
              <IoClose onClick={handleEditing} />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="m-3 p-2 bg-white">
            Username:{" "}
            {isEditing ? (
              <input className="w-auto" placeholder={inputs[0]} onChange={(e) => setName(e.target.value)}/>
            ) : (
              ` ${inputs[0]}`
            )}
          </div>
          <div className="m-3 p-2 bg-white">
            Email:{" "}
            {isEditing ? (
              <input className="w-auto" placeholder={inputs[1]} onChange={(e) => setEmail(e.target.value)}/>
            ) : (
              ` ${inputs[1]}`
            )}
          </div>
          <div
            className="relative m-3 p-2 bg-white border"
            style={{ border: "0.5px solid #C4B098" }}
          >
            Password:{" "}
            {isEditing ? (
              <input className="w-auto" placeholder={inputs[2]} onChange={(e) => setPassword(e.target.validationMessage)}/>
            ) : (
              <>
                {isVisible ? inputs[2] : "*".repeat(passwordSize)}
                <div className="absolute top-3 right-2">
                  {isVisible ? (
                    <FaRegEye onClick={handleVisible} />
                  ) : (
                    <FaRegEyeSlash onClick={handleVisible} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="m-3 p-2 w-9/10 flex justify-center">
          <button
            className="text-white w-1/3 py-2 px-4 rounded mt-4"
            style={{ backgroundColor: isEditing ? "#a79277" : "red" }}
            onClick={isEditing ? handleSave : () => setEditProfileOpen(true)}
          >
            {isEditing ? "Save" : "Delete account"}
          </button>
        </div>
      </div>
    </>
  );
}

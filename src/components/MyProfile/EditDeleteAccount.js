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
          <div className="h-auto w-2/3 flex justify-beginning m-3" data-testid="state-info">
            {isEditing ? "Edit" : "My Info"}
          </div>
          <div className="h-auto w-1/3 flex justify-end m-3">
            {!isEditing ? (
              <FaRegEdit onClick={handleEditing} data-testid="toggleEditing"/>
            ) : (
              <IoClose onClick={handleEditing} data-testid="closeEditing"/>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col">
        
        <p className="ml-3">Username:</p>  
          <div className="ml-3 mr-3 mb-3 p-2 bg-white" data-testid="username-div">
            
            {isEditing ? (
              <input className="w-auto" placeholder={inputs[0]} data-testid="username-input" onChange={(e) => setName(e.target.value)}/>
            ) : (
              ` ${inputs[0]}`
            )}
          </div>
          <p className="ml-3">Email:</p>  
          <div className="ml-3 mr-3 mb-3 p-2 bg-white" data-testid="email-div">
            
            {isEditing ? (
              <input type="email" className="w-8/9" placeholder={inputs[1]} data-testid="email-input" onChange={(e) => setEmail(e.target.value)}/>
            ) : (
              ` ${inputs[1]}`
            )}
          </div>
          <p className="ml-3">Password:</p>  
          <div
            className="relative ml-3 mr-3 mb-3 p-2 bg-white border" 
            style={{ border: "0.5px solid #C4B098" }}
            data-testid="password-div"
          >
            
            {isEditing ? (
              <input className="w-8/9" type="password" placeholder={inputs[2]} data-testid="password-input" onChange={(e) => setPassword(e.target.value)}/>
            ) : (
              <>
                {isVisible ? ` ${inputs[2]}` : "*".repeat(passwordSize)}
                <div className="absolute top-3 right-2">
                  {isVisible ? (
                    <FaRegEye onClick={handleVisible} data-testid="makevisible"/>
                  ) : (
                    <FaRegEyeSlash onClick={handleVisible} data-testid="makeinvisible"/>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="m-3 p-2 w-9/10 flex justify-center">
          <button
            data-testid="savedelete"
            className="text-white w-1/3 py-2 px-4 rounded mt-4"
            style={{ backgroundColor: isEditing ? "#a79277" : "#df4520" }}
            onClick={isEditing ? handleSave : () => setEditProfileOpen(true)}
            
          >
            {isEditing ? "Save" : "Delete account"}
          </button>
        </div>
      </div>
    </>
  );
}

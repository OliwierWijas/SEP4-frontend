import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function EditDeleteAccount({ setEditProfileOpen }) {
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
              <div className="ml-2 flex w-1/7">
              Username:
              </div>
              <div
                className="w-full bg-white p-2 mr-2 ml-2"
                data-testid="username-div"
              >
                {isEditing ? (
                  <input
                    className="w-auto"
                    placeholder={inputs[0]}
                    data-testid="username-input"
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  ` ${inputs[0]}`
                )}
              </div>
            </div>
            <div className="flex flex-row mt-3 mb-3 items-center">
            <div className="ml-2 mr-1 flex w-1/7">
              Password:
              </div>
              <div
                className="relative p-2 mr-2 ml-2 w-full bg-white"
                data-testid="password-div"
              >
                {isEditing ? (
                  <input
                    className="w-auto"
                    type="password"
                    placeholder={inputs[2]}
                    data-testid="password-input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ) : (
                  <>
                    {isVisible ? ` ${inputs[2]}` : "*".repeat(passwordSize)}
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
              onClick={isEditing ? handleSave : () => setEditProfileOpen(true)}
            >
              {isEditing ? "SAVE" : "DELETE ACCOUNT"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import BrownButton from '../BrownButton.js';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

function EditLockPassword() {
    const [buttonText] = useState("Edit");
    const [isVisible, toggleVisible] = useState(false);
    const [password, setPassword] = useState("");

    const handleVisible = () => {
        toggleVisible(!isVisible);
    };

    const handleButtonClick = () => {
        setPassword("");
    };

    return (
        <div>
            <div className="brown-gradient-y h-400 w-full flex flex-col rounded-md shadow-md mb-10" data-testid="member-box">
                <div className="min-h-24 w-full flex justify-between items-center p-5">
                    <div className="ml-5 text-2xl lg:text-4xl font-bold text-white">HOME LOCKER</div>
                    <div className="flex w-full lg:w-auto mr-2">
                        <div className="relative mr-2 flex-grow">
                            <input className="w-full lg:w-96 h-8 p-1 mt-1 rounded-md shadow-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75 border border-brown-500"
                                type={isVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New password..."
                                data-testid="password-input" // Test ID added
                            />
                            <div className="absolute top-0 right-0 h-full flex items-center pr-2">
                                <div onClick={handleVisible} className="hover:cursor-pointer" data-testid="visibility-button">
                                    {isVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>
                            </div>
                        </div>
                        <div>
                            <BrownButton text={buttonText} onClick={handleButtonClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditLockPassword;

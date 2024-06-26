import { useContext, useState } from 'react';
import BrownButton from '../BrownButton.js';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { useChangeLockPassword } from '../../hooks/home/useChangeLockPassword.js';
import { AuthContext } from '../../auth/AuthContext.js';

function EditLockPassword() {
    const { claims } = useContext(AuthContext)
    const token = claims?.token
    const houseId = claims?.houseId

    const [isVisible, toggleVisible] = useState(false);
    const [password, setPassword] = useState("");
    
    const changeLockPassword = useChangeLockPassword()

    const handleVisible = () => {
        toggleVisible(!isVisible);
    };

    const handleButtonClick = () => {
        changeLockPassword(houseId, password, token)
        setPassword("");
    };

    return (
        <div>
            <div className="brown-gradient-y h-400 w-full flex flex-col rounded-md shadow-md mb-10" data-testid="member-box">
                <div className="min-h-24 w-full flex justify-between items-center p-5">
                    <div className="ml-5 text-2xl lg:text-4xl font-bold text-white">HOME LOCKER</div>
                    <div className="flex w-full lg:w-1/2 flex-row">
                        <div className="relative mr-2 flex-grow">
                            <input className="w-full h-8 p-1 mt-1 rounded-md shadow-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75 border border-brown-500"
                                type={isVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New password..."
                                data-testid="password-input" // Test ID added
                            />
                            <div className="absolute top-0 right-0 h-full flex items-center pr-2">
                                <div onClick={handleVisible} className="hover:cursor-pointer" data-testid="visibility-button">
                                    {isVisible ? <FaRegEyeSlash data-testid="eye-slash-icon" /> : <FaRegEye data-testid="eye-icon" />}
                                </div>
                            </div>
                        </div>
                        <div>
                            <BrownButton text={"Edit"} onClick={handleButtonClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditLockPassword;

import { useState } from 'react';
import '../styles/ScrollBar.css';
import BrownButton from './BrownButton.js';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

function LockerPopUp() {
    const [buttonText, setButtonText] = useState("Lock");
    const [password, setPassword] = useState("");
    const [isVisible, toggleVisible] = useState(false);

    const handleVisible = () => {
        toggleVisible(!isVisible);
    };

    const handleButtonClick = () => {
        setPassword("");
        setButtonText(buttonText === "Lock" ? "Unlock" : "Lock");
    };

    return (
        <div className="brown-gradient-y h-96 w-1/2 flex flex-col rounded-md shadow-md">
            <div className="min-h-24 w-full flex items-center ml-5 text-2xl lg:text-3xl font-bold text-white">HOME LOCKER</div>
            <div className="bg-white mb-2 bg-opacity-15 h-full w-full text-xs md:text-sm lg:text-base flex flex-col rounded-md">
                <div className="flex flex-col justify-center items-center my-16">
                    <div className="relative w-1/2">
                        <input 
                            type={isVisible ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="h-14 w-full p-4 rounded-md text-center pr-12" 
                            placeholder="Enter password..."
                            data-testid="password-input" // Test ID added
                        />
                        <div className="absolute top-0 right-0 h-full flex items-center pr-4">
                            <div onClick={handleVisible} className="hover:cursor-pointer" data-testid="visibility-button"> {/* Test ID added */}
                                {isVisible ? <FaRegEyeSlash/> : <FaRegEye />}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <BrownButton text={buttonText} onClick={handleButtonClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LockerPopUp;

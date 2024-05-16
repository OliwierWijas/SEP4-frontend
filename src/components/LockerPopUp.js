import { useState } from 'react';
import '../styles/ScrollBar.css';
import BrownButton from './BrownButton.js';

function LockerPopUp() {
    const [buttonText, setButtonText] = useState("Lock");
    const [password, setPassword] = useState("");

    const handleButtonClick = () => {
        setPassword("");
        setButtonText(buttonText === "Lock" ? "Unlock" : "Lock");
    };

    return (
        <div className="brown-gradient-y h-96 w-1/2 flex flex-col rounded-md shadow-md">
            <div className="min-h-24 w-full flex items-center ml-5 text-2xl lg:text-3xl font-bold text-white">HOME LOCKER</div>
            <div className="bg-white mb-2 bg-opacity-15 h-full w-full text-xs md:text-sm lg:text-base flex flex-col rounded-md">
                <div className="flex flex-col justify-center items-center my-16">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 w-1/2 p-4 rounded-md text-center mb-2" placeholder="Enter password..." />
                    <div className="mt-6">
                        <BrownButton text={buttonText} onClick={handleButtonClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LockerPopUp;

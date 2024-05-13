import { useState } from "react"
import close from "../images/close.png"

function PopUp({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseClick = () => {
        setIsOpen(false);
    };

    return (
        <div className={`${isOpen ? "fixed" : "hidden"} top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 z-10 backdrop-filter backdrop-blur-sm flex items-center justify-center`}>
            <img onClick={handleCloseClick}
            src={close} 
            alt="Close" 
            className="w-10 h-auto absolute top-10 right-10 hover:cursor-pointer focus:cursor-pointer" />
            <div className="w-4/5">
                {isOpen && children}
            </div>
        </div>
    )
}

export default PopUp
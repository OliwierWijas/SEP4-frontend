import { IoClose } from "react-icons/io5";

function PopUp({ children, notificationOpen, setNotificationOpen }) {
    const handleCloseClick = () => {
        setNotificationOpen(false);
    };

    return (
        <div className={`${notificationOpen ? "fixed z-10" : "hidden z-0"} top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-sm flex items-center justify-center`}>
            <IoClose
                onClick={handleCloseClick}
                className="w-12 h-auto absolute top-10 right-10 hover:cursor-pointer focus:cursor-pointer" />
            <div className="w-4/5">
                {notificationOpen && children}
            </div>
        </div>
    )
}

export default PopUp
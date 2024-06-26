import NotificationComponent from "./NotificationComponent.js"
import '../../styles/ScrollBar.css';
import { useNotifications } from "../../hooks/home/useNotifications.js";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext.js";

function NotificationBoxComponent() {
    const { claims } = useContext(AuthContext)
    const houseId = claims?.houseId
    const token = claims?.token

    const notificationData = useNotifications(houseId, token)

    return (
        <div className="brown-gradient-y h-512 w-full flex flex-col rounded-md shadow-md" data-testid="notification-box">
            <div className="min-h-24 w-full flex items-center ml-5 text-2xl lg:text-4xl font-bold text-white">HOME UPDATES</div>
            <div className="bg-white mb-2 bg-opacity-15 h-full w--full text-xs md:text-sm lg:text-base flex flex-col justify-start rounded-md overflow-y-auto scrollbar">
                <NotificationComponent notificationArray={notificationData} />
            </div>
        </div>
    )
}

export default NotificationBoxComponent
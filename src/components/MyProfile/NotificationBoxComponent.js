import NotificationComponent from "./NotificationComponent.js"
import '../../styles/ScrollBar.css';
import notificationData from "../../dummyData/Notifications.js";

function NotificationBoxComponent() {
    return (
        <div className="brown-gradient-y h-512 lg:h-96 w-full flex flex-col rounded-md">
            <div className="min-h-24 w-full flex items-center ml-5 text-3xl lg:text-5xl font-bold text-white">HOME UPDATES</div>
            <div className="bg-white mb-2 bg-opacity-15 h-full w--full text-xs md:text-sm lg:text-base flex flex-col justify-start rounded-md overflow-y-auto scrollbar">
                <NotificationComponent notificationArray={notificationData} />
            </div>
        </div>
    )
}

export default NotificationBoxComponent
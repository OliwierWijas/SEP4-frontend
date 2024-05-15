function NotificationComponent({ notificationArray }) {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
    };

    return (
        <>
            {notificationArray && notificationArray.map((notification, index) => (
                <div key={index} className="bg-white bg-opacity-15 h-fit w-95 mx-2 my-2 rounded-md flex md:items-center text-wrap" data-testid="notification-item">
                    {notification.dateString && <div className="mx-auto w-1/3 md:w-1/4 lg:w-1/5 mt-2 ml-2 md:my-2 md:mx-2 md:mr-6">{new Date(notification.dateString).toLocaleDateString("en-US", options)}</div>}
                    {notification.text && <div className="flex w-2/3 md:w-3/4 lg:w-4/5 my-2 mx-2 text-justify md:text-left">{notification.text}</div>}
                </div>
            ))}
        </>
    )
}

export default NotificationComponent
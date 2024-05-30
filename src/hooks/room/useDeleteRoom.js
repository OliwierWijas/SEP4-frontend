export function useDeleteRoom() {
    const deleteRoom = async (deviceId, refreshRoomData, token) => {
        try {
            if (deviceId > 0) {
                const response = await fetch(`http://172.214.63.232:80/rooms/${deviceId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "DELETE"
                }).catch(error => alert(`Error deleting room: ${error}`))
                if (response) {
                    refreshRoomData(prev => prev + 1)
                    const responseBody = await response.text()
                    alert(responseBody)
                } else {
                    alert("Error while deleting room.")
                }
            }
        } catch (error) {
            alert("Error while deleting room.")
        }
    }
    return deleteRoom
}
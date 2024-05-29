export function useAddRoom() {
    const addRoom = async (room, refreshRoomData, token) => {
        try {
            if (room !== undefined && room !== null) {
                const response = await fetch("http://172.214.63.209:80/rooms", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                    body: JSON.stringify(room),
                }).catch(error => alert(`Error adding room: ${error}`))
                if (response) {
                    refreshRoomData(prev => prev + 1)
                    const responseBody = await response.text()
                    alert(responseBody)
                } else {
                    alert("Error while adding room.")
                }
            }
        } catch (error) {
            alert("Error while adding room.")
        }
    }
    return addRoom
}
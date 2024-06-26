export function useEditRoom() {
    const editRoom = async (roomId, editedRoom, refreshRoomData, token) => {
        try {
            if (roomId !== undefined && roomId !== null && editedRoom !== null && editedRoom !== undefined) {
                const response = await fetch(`http://172.214.63.232:80/rooms/${roomId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "PUT",
                    body: JSON.stringify(editedRoom),
                }).catch(error => alert(`Error editing room: ${error}`))
                if (response) {
                    refreshRoomData(prev => prev + 1)
                    const responseBody = await response.text()
                    alert(responseBody)
                    if (response.ok) {
                        return true
                    }
                } else {
                    alert("Error while editing room.")
                }
            }
        } catch (error) {
            alert("Error while editing room.")
        }
    }

    return editRoom
}
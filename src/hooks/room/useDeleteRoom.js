export function useDeleteRoom() {
    const deleteRoom = async (deviceId) => {
        try {
            console.log(deviceId)
            if (deviceId > 0) {
                const token = localStorage.getItem("jwt")
                const response = await fetch(`http://localhost:8080/rooms/${deviceId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "DELETE"
                }).catch(error => alert(`Error deleting room: ${error}`))
                if (response) {
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
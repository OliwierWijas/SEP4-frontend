export function useEditRoom() {
    const editRoom = async (roomId, editedRoom) => {
        try {
            if (roomId > 0 && editedRoom !== null && editedRoom !== undefined) {
                const token = localStorage.getItem("jwt")
                const response = await fetch(`http://localhost:8080/rooms/${roomId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "PUT",
                    body: JSON.stringify(editedRoom),
                }).catch(error => alert(`Error editing room: ${error}`))
                if (response.ok) {
                    const responseBody = await response.text()
                    alert(responseBody)
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
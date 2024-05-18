export function useAddRoom(room) {
    const addRoom = async () => {
        try {
            if (room !== undefined && room !== null) {
                console.log(JSON.stringify(room))
                const token = localStorage.getItem("jwt")
                const response = await fetch("http://localhost:8080/rooms", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                    body: JSON.stringify(room),
                })
                if (response.ok) {
                    alert("Room has been added.")
                }
                else {
                    alert("Error while adding room.")
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    return addRoom
}
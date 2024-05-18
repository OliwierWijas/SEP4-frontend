import { useEffect } from "react"

export function useEditRoom({ roomId, newRoom }) {
    useEffect(() => {
        const editRoom = async () => {
            const token = localStorage.getItem("jwt")
            const response = await fetch(`http://localhost:8080/rooms/${roomId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "PUT",
                body: JSON.stringify(newRoom),
            })
            if (response.ok) {
                return "Room has been edited."
            }
            else {
                return "Error while editing room."
            }
        }
        editRoom()
    }, [roomId, newRoom])
}
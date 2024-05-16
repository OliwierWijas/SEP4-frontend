import { useEffect } from "react"

export function useEditRoom({ roomId, newRoom }) {
    useEffect(() => {
        const editRoom = async () => {
            const response = await fetch(`http://localhost:8080/rooms?roomId=${roomId}`, {
                headers: { "Content-Type": "application/json" },
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
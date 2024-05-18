import { useEffect } from "react"

export function useDeleteRoom({ deviceId }) {
    useEffect(() => {
        const deleteRoom = async () => {
            const token = localStorage.getItem("jwt")
            const response = await fetch(`http://localhost:8080/rooms/${deviceId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "DELETE"
            })
            if (response.ok) {
                return "Room has been deleted."
            }
            else {
                return "Error while deleting room."
            }
        }
        deleteRoom()
    }, [deviceId])
}
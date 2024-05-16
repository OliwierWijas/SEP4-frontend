import { useEffect } from "react"

export function useDeleteRoom({ deviceId }) {
    useEffect(() => {
        const deleteRoom = async () => {
            const response = await fetch(`http://localhost:8080/rooms?id=${deviceId}`, {
                headers: { "Content-Type": "application/json" },
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
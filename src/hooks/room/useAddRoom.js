import { useEffect } from "react"

export function useAddRoom({ room }) {
    useEffect(() => {
        const addRoom = async () => {
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
                return "Room has been added."
            }
            else {
                return "Error while adding room."
            }
        }
        addRoom()
    }, [room])
}
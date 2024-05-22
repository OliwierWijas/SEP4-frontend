import { useState, useEffect } from 'react';

export function useRoomData(houseId, roomDataIndex) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (houseId && houseId > 0) {
            const controller = new AbortController();
            const signal = controller.signal;
            const token = localStorage.getItem("jwt");

            fetch(`http://localhost:8080/rooms/${houseId}`, {
                signal,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "GET",
            })
                .then(response => response.json())
                .then(rooms => setRooms(rooms))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching room data: ${error}`);
                    }
                });

            return () => {
                controller.abort();
            }
        }
    }, [houseId, roomDataIndex]);

    return rooms;
}
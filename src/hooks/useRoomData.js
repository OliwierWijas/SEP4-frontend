import { useState, useEffect } from 'react';

export function useRoomData({ houseId }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (houseId > 0) {
            const controller = new AbortController();
            const signal = controller.signal;

            fetch(`https://localhost:8080/rooms?houseId=${houseId}`, { signal })
                .then(response => response.json())
                .then(data => setRooms(data))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching room data: ${error}`);
                    }
                });


            return () => {
                controller.abort();
            }
        }
    }, [houseId]);

    return rooms;
}
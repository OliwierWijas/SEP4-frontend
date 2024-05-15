import { useState, useEffect } from 'react';
import roomData from '../dummyData/RoomData.js';

export function useRoomData({ houseId }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (houseId < 0) {
            fetch(`https://localhost:8080/rooms?houseId=${houseId}`, { signal })
                .then(response => response.json())
                .then(data => setRooms(data))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching room data: ${error}`);
                    }
                });
        } else {
            setRooms(roomData)
        }

        return () => {
            controller.abort();
        };
    }, []);

    return rooms;
}
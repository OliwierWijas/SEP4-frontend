import { useState, useEffect } from 'react';

export function useRoomData() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch('https://localhost:8080/reading', { signal }) 
            .then(response => response.json())
            .then(data => setRooms(data))
            .catch(error => {
                if (error.name !== "AbortError") {
                    console.log(`Error fetching room data: ${error}`);
                }
            });

        return () => {
            controller.abort();
        };
    }, []);

    return rooms;
}
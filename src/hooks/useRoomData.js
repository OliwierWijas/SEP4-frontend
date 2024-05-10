import { useState, useEffect } from 'react';
import roomData from '../dummyData/RoomData.js';

export function useRoomData() {
    const [rooms, setRooms] = useState([]);

    function mockFetch(url, options) {
        const dummyResponse = {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            },
            json: () => Promise.resolve({ message: roomData })
        };

        return Promise.resolve(dummyResponse);
    }

    window.fetch = mockFetch

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch('https://localhost:8080/rooms', { signal }) 
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
import { useState, useEffect } from 'react';

export function useRoomData(houseId) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (houseId && houseId > 0) {
            const controller = new AbortController();
            const signal = controller.signal;

            fetch(`http://localhost:8080/rooms/${houseId}`, { signal })
                .then(response => response.json())
                .then(async (rooms) => {
                    const token = localStorage.getItem("jwt");

                    const roomDataPromises = rooms.map(async room => {
                        const temperature = await fetchTemperature(room.deviceId, token, signal);
                        const humidity = await fetchHumidity(room.deviceId, token, signal);
                        const lightLevel = await fetchLightLevel(room.deviceId, token, signal);

                        return {
                            ...room,
                            latestTemperature: temperature,
                            latestHumidity: humidity,
                            latestLightLevel: lightLevel
                        };
                    });

                    const roomsWithMetrics = await Promise.all(roomDataPromises);
                    setRooms(roomsWithMetrics);
                })
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

async function fetchTemperature(deviceId, token, signal) {
    try {
        const response = await fetch(`http://localhost:8080/temperature/${deviceId}/latest`, {
            signal,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        });
        return await response.json();
    } catch (error) {
        if (error.name !== "AbortError") {
            console.log(`Error fetching latest temperature data for deviceId ${deviceId}: ${error}`);
        }
        return 1;
    }
}

async function fetchHumidity(deviceId, token, signal) {
    try {
        const response = await fetch(`http://localhost:8080/humidity/${deviceId}/latest`, {
            signal,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        });
        return await response.json();
    } catch (error) {
        if (error.name !== "AbortError") {
            console.log(`Error fetching latest humidity data for deviceId ${deviceId}: ${error}`);
        }
        return 2;
    }
}

async function fetchLightLevel(deviceId, token, signal) {
    try {
        const response = await fetch(`http://localhost:8080/light/${deviceId}/latest`, {
            signal,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        });
        return await response.json();
    } catch (error) {
        if (error.name !== "AbortError") {
            console.log(`Error fetching latest light level data for deviceId ${deviceId}: ${error}`);
        }
        return 3 * 25;
    }
}

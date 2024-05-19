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
                        const temperaturePromise = fetch(`http://localhost:8080/humidity/${room.deviceId}/latest`, {
                            signal,
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            method: "GET"
                        }).then(response => response.json())
                          .catch(error => {
                              if (error.name !== "AbortError") {
                                  console.log(`Error fetching latest temperature data for deviceId ${room.deviceId}: ${error}`);
                              }
                              return null;
                          });

                        const humidityPromise = fetch(`http://localhost:8080/humidity/${room.deviceId}/latest`, {
                            signal,
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            method: "GET"
                        }).then(response => response.json())
                          .catch(error => {
                              if (error.name !== "AbortError") {
                                  console.log(`Error fetching latest humidity data for deviceId ${room.deviceId}: ${error}`);
                              }
                              return null;
                          });

                        const lightLevelPromise = fetch(`http://localhost:8080/light/${room.deviceId}/latest`, {
                            signal,
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            method: "GET"
                        }).then(response => response.json())
                          .catch(error => {
                              if (error.name !== "AbortError") {
                                  console.log(`Error fetching latest light level data for deviceId ${room.deviceId}: ${error}`);
                              }
                              return null;
                          });

                        return Promise.all([temperaturePromise, humidityPromise, lightLevelPromise])
                            .then(([temperature, humidity, lightLevel]) => ({
                                ...room,
                                latestTemperature: temperature,
                                latestHumidity: humidity,
                                latestLightLevel: lightLevel
                            }));
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
import { useEffect } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useSetTemperature({ deviceId, radiatorLevel }) {
    useEffect(() => {
        if (deviceId === undefined || deviceId === null || radiatorLevel === undefined || radiatorLevel === null) {
            return
        }
        if (roomData.find(r => r.id === deviceId)) {
            roomData.find(r => r.id === deviceId).radiatorLevel = radiatorLevel
        }
        console.log(`Radiator level of room ${deviceId} set to ${radiatorLevel}`)

        return () => {}
    }, [deviceId, radiatorLevel])
}
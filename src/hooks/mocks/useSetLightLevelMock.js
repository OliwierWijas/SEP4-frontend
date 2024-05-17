import { useEffect } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useSetLightLevel({ deviceId, lightLevel }) {
    useEffect(() => {
        if (deviceId === undefined || deviceId === null || lightLevel === undefined || lightLevel === null) {
            return
        } 
        if (roomData.find(r => r.id === deviceId)) {
            roomData.find(r => r.id === deviceId).lightLevel = lightLevel
        }

        return () => { }
    }, [deviceId, lightLevel])
}
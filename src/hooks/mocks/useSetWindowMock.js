import { useEffect } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useSetWindow({ deviceId, windowStatus }) {
    useEffect(() => {
        if (deviceId === undefined || deviceId === null || windowStatus === undefined || windowStatus === null) {
            return
        }
        roomData.find(r => r.id === deviceId).window = windowStatus
        console.log(`Window of room ${deviceId} set to ${windowStatus}.`)

        return () => { }
    }, [deviceId, windowStatus])
}
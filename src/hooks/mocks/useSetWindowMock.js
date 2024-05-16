import { useEffect } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useSetWindow({ deviceId, windowStatus }) {
    useEffect(() => {
        if (deviceId === undefined || windowStatus === undefined) return
        roomData.find(r => r.id === deviceId).window = windowStatus
        console.log(`Window of room ${deviceId} set to ${windowStatus}.`)
    }, [deviceId, windowStatus])
}
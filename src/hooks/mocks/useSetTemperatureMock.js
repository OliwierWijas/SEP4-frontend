import roomData from "../../dummyData/RoomData.js"

export function setTemperature( { deviceId, radiatorLevel } ) {
    if (deviceId === undefined || radiatorLevel === undefined) return
    roomData.find(r => r.id === deviceId).radiatorLevel = radiatorLevel
    console.log(`Radiator level of room ${deviceId} set to ${radiatorLevel}`)
}
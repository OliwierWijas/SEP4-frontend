import roomData from "../../dummyData/RoomData.js"

export function setLightLevel( { deviceId, lightLevel } ) {
    if (deviceId === undefined || lightLevel === undefined) return
    roomData.find(r => r.id === deviceId).lightLevel = lightLevel
    console.log(`Light level of room ${deviceId} set to ${lightLevel}.`)
}
import roomData from "../../dummyData/RoomData.js"

export function setWindow( { deviceId, windowStatus } ) {
    if (deviceId === undefined || windowStatus === undefined) return
    roomData.find(r => r.id === deviceId).window = windowStatus
    console.log(`Window of room ${deviceId} set to ${windowStatus}.`)
}
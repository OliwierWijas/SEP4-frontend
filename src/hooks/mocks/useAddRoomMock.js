import roomData from "../../dummyData/RoomData.js";

export function addRoom({ id = undefined, name = undefined, temperature = "0", humidity = 0, lightLevel = "0" } = {}) {
    roomData.push({ id, name, temperature, humidity, lightLevel})
}
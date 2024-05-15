import { TemperatureData } from "../../dummyData/Temperature.js"
import { HumidityData } from "../../dummyData/Humidity.js"

export function useTemperature({ roomId = undefined, interval = undefined } = {}) {
    if (roomId === undefined && interval === undefined) {
        return
    }

    if (roomId === 1) {
        return HumidityData
    } else {
        return TemperatureData
    }
}
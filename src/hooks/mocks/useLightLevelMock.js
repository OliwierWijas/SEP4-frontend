import { TemperatureData } from "../../dummyData/Temperature.js"
import { LightData } from "../../dummyData/LightData.js"

export function useLightLevel({ roomId = undefined, interval = undefined } = {}) {
    if (roomId === undefined && interval === undefined) {
        return
    }
    
    if (roomId === 1) {
        return TemperatureData
    } else {
        return LightData
    }
}
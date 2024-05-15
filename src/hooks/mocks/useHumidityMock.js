import { HumidityData } from "../../dummyData/Humidity.js"
import { LightData } from "../../dummyData/LightData.js"

export function useHumidity({ roomId = undefined, interval = undefined } = {}) {
    if (roomId === undefined && interval === undefined) {
        return
    }
    
    if (roomId === 1) {
        return LightData
    } else {
        return HumidityData
    }
}
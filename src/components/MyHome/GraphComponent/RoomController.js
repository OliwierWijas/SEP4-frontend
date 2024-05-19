import Toggle from './Toggle.js'
import { useSetRadiator } from '../../../hooks/room/useSetRadiator.js'
import { useSwitchWindow } from '../../../hooks/room/useSetWindow.js'
import { useSetLightLevel } from '../../../hooks/room/useSetLightLevel.js'

function RoomController({ room, setRoom}) {
    const setTemperature = useSetRadiator()
    const setWindow = useSwitchWindow()
    const setLight = useSetLightLevel()

    const incrementRadiatorStatus = () => {
        setRoom(prevRoom => {
            const newRadiatorState = Math.min(prevRoom.radiatorState + 1, 6)
            return { ...prevRoom, radiatorState: newRadiatorState }
        })
        setTemperature(room)
    }

    const decrementRadiatorStatus = () => {
        setRoom(prevRoom => {
            const newRadiatorState = Math.max(prevRoom.radiatorState - 1, 0)
            return { ...prevRoom, radiatorState: newRadiatorState }
        })
        setTemperature(room)
    }

    const incrementLightStatus = () => {
        setRoom(prevRoom => {
            const newLightLevel = Math.min(prevRoom.lightLevel + 1, 4)
            return { ...prevRoom, lightLevel: newLightLevel }
        })
        setLight(room)
    }

    const decrementLightStatus = () => {
        setRoom(prevRoom => {
            const newLightLevel = Math.max(prevRoom.lightLevel - 1, 0)
            return { ...prevRoom, lightLevel: newLightLevel }
        })
        setLight(room)
    }

    const switchWindow = () => {
        setRoom(prevRoom => {
            return {...prevRoom, isWindowOpen: !prevRoom.isWindowOpen}
        })
        setWindow(room)
    }

    return (
        <>
            <div className="flex justify-between my-7 flex-col lg:flex-row items-center" data-testid="room-controller">
                <div className="flex items-center">
                    <p style={{ color: "#a79277" }} className="font-semibold">Radiator</p>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2" onClick={incrementRadiatorStatus} data-testid="radiator-up">▲</button>
                    <div style={{ height: "40px", width: "35px", border: "0.5px solid #C4B098", color: "#C4B098" }} className="flex justify-center items-center font-bold text-xl shadow-md rounded">{room?.radiatorState}</div>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2" onClick={decrementRadiatorStatus} data-testid="radiator-down">▼</button>
                </div>
                <div className='flex items-center mt-8 lg:mt-0'>
                    <p style={{ color: "#a79277" }} className="font-semibold mx-2">Windows</p>
                    <Toggle status={room?.isWindowOpen} setStatus={switchWindow}></Toggle>
                </div>
                <div className="flex items-center mt-8 lg:mt-0">
                    <p style={{ color: "#a79277" }} className="font-semibold">Light level</p>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2" onClick={incrementLightStatus} data-testid="lights-up">▲</button>
                    <div style={{ height: "40px", width: "35px", border: "0.5px solid #C4B098", color: "#C4B098" }} className="flex justify-center items-center font-bold text-xl shadow-md rounded">{room?.lightLevel}</div>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2" onClick={decrementLightStatus} data-testid="lights-down">▼</button>
                </div>
            </div>
        </>
    );
}

export default RoomController;

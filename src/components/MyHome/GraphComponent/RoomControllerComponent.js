import Toggle from './Toggle.js'
import { useSetRadiator } from '../../../hooks/room/useSetRadiator.js'
import { useSwitchWindow } from '../../../hooks/room/useSetWindow.js'
import { useSetLightLevel } from '../../../hooks/room/useSetLightLevel.js'
import { AuthContext } from '../../../auth/AuthContext.js'
import { useContext } from 'react';

function RoomController({ room, setRoom }) {
    const { claims } = useContext(AuthContext)
    const token = claims?.token

    const setRadiator = useSetRadiator()
    const setWindow = useSwitchWindow()
    const setLight = useSetLightLevel()

    const incrementRadiatorStatus = () => {
        if (room.radiatorState === 6) {
            alert("Radiator state cannot be higher than 6.")
            return
        }
        setRoom(prevRoom => {
            const newRadiatorState = Math.min(prevRoom.radiatorState + 1, 6)
            const newRoom = { ...prevRoom, radiatorState: newRadiatorState }
            setRadiator(newRoom, token)
            return newRoom
        })
    }

    const decrementRadiatorStatus = () => {
        if (room.radiatorState === 0) {
            alert("Radiator state cannot be lower than 0.")
            return
        }
        setRoom(prevRoom => {
            const newRadiatorState = Math.max(prevRoom.radiatorState - 1, 0)
            const newRoom = { ...prevRoom, radiatorState: newRadiatorState }
            setRadiator(newRoom, token)
            return newRoom
        })
    }

    const incrementLightStatus = () => {
        if (room.lightLevel === 4) {
            alert("Light state cannot be higher than 6.")
            return
        }
        setRoom(prevRoom => {
            const newLightLevel = Math.min(prevRoom.lightLevel + 1, 4)
            const newRoom = { ...prevRoom, lightLevel: newLightLevel }
            setLight(newRoom, token)
            return newRoom
        })
    }

    const decrementLightStatus = () => {
        if (room.lightLevel === 0) {
            alert("Light state cannot be lower than 0.")
            return
        }
        setRoom(prevRoom => {
            const newLightLevel = Math.max(prevRoom.lightLevel - 1, 0)
            const newRoom = { ...prevRoom, lightLevel: newLightLevel }
            setLight(newRoom, token)
            return newRoom
        })
    }

    const switchWindow = () => {
        setRoom(prevRoom => {
            const newRoom = { ...prevRoom, isWindowOpen: !prevRoom.isWindowOpen }
            setWindow(newRoom, token)
            return newRoom
        })
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
                    <Toggle status={room?.isWindowOpen ?? false} setStatus={switchWindow}></Toggle>
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

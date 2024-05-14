import Toggle from './Toggle.js';
import { useManageTemperature } from '../../../hooks/useManageTemperature.js';
import { useManageWindow } from '../../../hooks/useManageWindow.js';
import { useManageLight } from '../../../hooks/useManageLight.js';

function RoomController({ radiatorStatus, setRadiatorStatus, windowsStatus, setWindowsStatus, lightStatus, setLightStatus }) {
    //useManageTemperature(radiatorStatus)
    //useManageWindow(windowsStatus)
    //useManageLight(lightStatus)

    const incrementRadiatorStatus = () => {
        setRadiatorStatus(prevState => {
            if (prevState < 6) {
                return prevState + 1
            } else {
                return prevState
            }
        });
    }

    const decrementRadiatorStatus = () => {
        setRadiatorStatus(prevState => {
            if (prevState > 0) {
                return prevState - 1
            } else {
                return prevState
            }
        });
    }

    const incrementLightStatus = () => {
        setLightStatus(prevState => {
            if (prevState < 4) {
                return prevState + 1
            } else {
                return prevState
            }
        });
    }

    const decrementLightStatus = () => {
        setLightStatus(prevState => {
            if (prevState > 0) {
                return prevState - 1
            } else {
                return prevState
            }
        });
    }

    return (
        <>
            <div className="flex justify-between my-7 flex-col lg:flex-row items-center" data-testid="room-controller">
                <div className="flex items-center">
                    <p style={{ color: "#a79277" }} className="font-semibold">Radiator</p>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2" onClick={incrementRadiatorStatus}>▲</button>
                    <div style={{ height: "40px", width: "35px", border: "0.5px solid #C4B098", color: "#C4B098" }} className="flex justify-center items-center font-bold text-xl shadow-md rounded">{radiatorStatus}</div>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2" onClick={decrementRadiatorStatus}>▼</button>
                </div>
                <div className='flex items-center mt-8 lg:mt-0'>
                    <p style={{ color: "#a79277" }} className="font-semibold mx-2">Windows</p>
                    <Toggle windowsStatus={windowsStatus} setWindowsStatus={setWindowsStatus}></Toggle>
                </div>
                <div className="flex items-center mt-8 lg:mt-0">
                    <p style={{ color: "#a79277" }} className="font-semibold">Light level</p>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2" onClick={incrementLightStatus}>▲</button>
                    <div style={{ height: "40px", width: "35px", border: "0.5px solid #C4B098", color: "#C4B098" }} className="flex justify-center items-center font-bold text-xl shadow-md rounded">{lightStatus}</div>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2" onClick={decrementLightStatus}>▼</button>
                </div>
            </div>
        </>
    );
}

export default RoomController;

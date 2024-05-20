import { useState } from "react";
import { useEditRoom } from "../../../hooks/room/useEditRoom.js";

function EditRoom({ room }) {
    const { name, deviceId, preferedTemperature, preferedHumidity } = room;

    const [newName, setNewName] = useState(name);
    const [newDeviceId, setNewDeviceId] = useState(deviceId);
    const [newPreferredTemperature, setNewPreferredTemperature] = useState(preferedTemperature);
    const [newPreferredHumidity, setNewPreferredHumidity] = useState(preferedHumidity);

    const editRoom = useEditRoom()

    const onEdit = () => {
        const editedRoom = {
            name: newName,
            deviceId: newDeviceId,
            preferedTemperature: newPreferredTemperature,
            preferedHumidity: newPreferredHumidity
        }

        // dont know if edit room is by device id or by roomId
        editRoom(deviceId, editedRoom)
    }

    return (
        <div className="brown-gradient-y flex w-full lg:w-1/2 rounded-md shadow-md flex-col">
            <div className="min-h-24 w-full flex items-center ml-5 text-3xl lg:text-5xl font-bold text-white">EDIT ROOM</div>
            <div className="bg-white bg-opacity-15 h-full text-xs md:text-sm lg:text-base flex flex-col justify-center items-center rounded-md">
                <form className="flex flex-col w-2/3 my-5">
                    <div className="flex items-center">
                        <label className="mr-2 font-bold text-white">Room:</label>
                        <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="text" id="newRoomName" name="roomName" placeholder="Room name" defaultValue={name} onChange={(e) => setNewName(e.target.value)} required />
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2 font-bold text-white">Device Id:</label>
                        <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="newDeviceId" name="deviceId" placeholder="Device Id" defaultValue={deviceId} onChange={(e) => setNewDeviceId(e.target.value)} required />
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2 font-bold text-white">Preferred Temperature:</label>
                        <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="newPreferredTemperature" name="temperature" placeholder="Preferred temperature (°C)" min="5" max="40" defaultValue={preferedTemperature} onChange={(e) => setNewPreferredTemperature(e.target.value)} required />
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2 font-bold text-white">Preferred Humidity:</label>
                        <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="newPreferredHumidity" name="humidity" placeholder="Preferred humidity (%)" min="0" max="100" defaultValue={preferedHumidity} onChange={(e) => setNewPreferredHumidity(e.target.value)} required />
                    </div>
                    <button className="bg-light-brown text-base w-64 h-16 mx-auto mt-5 py-5 rounded-md" onClick={() => onEdit()}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default EditRoom;

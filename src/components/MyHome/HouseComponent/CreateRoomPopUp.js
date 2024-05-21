import React, { useState } from 'react';
import { useAddRoom } from "../../../hooks/room/useAddRoom.js";

function CreateRoom({refreshRoomData}) {
    const [roomName, setRoomName] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [preferredTemperature, setPreferredTemperature] = useState('');
    const [preferredHumidity, setPreferredHumidity] = useState('');

    const addRoom = useAddRoom();

    const handleAddRoom = (event) => {
        event.preventDefault();
        if (roomName === '') {
            alert("Room name cannot be empty.")
        } else if (deviceId === '') {
            alert("Device id cannot be empty.")
        } else if (preferredTemperature === '') {
            alert("Temperature cannot be empty.")
        } else if (preferredHumidity === '') {
            alert ("Humidity cannot be empty.")
        }
        addRoom({
            name: roomName,
            deviceId,
            homeId: localStorage.getItem("houseId"),
            preferedTemperature: preferredTemperature,
            preferedHumidity :preferredHumidity
        })
        refreshRoomData(prev => prev + 1)
        clear()
    }

    const clear = () => {
        setRoomName('')
        setDeviceId('')
        setPreferredTemperature('')
        setPreferredHumidity('')
    }

    return (
        <div className="brown-gradient-y flex w-full lg:w-1/2 rounded-md shadow-md flex-col">
            <div className="min-h-24 w-full flex items-center ml-5 text-3xl lg:text-5xl font-bold text-white">CREATE ROOM</div>
            <div className="bg-white bg-opacity-15 h-full text-xs md:text-sm lg:text-base flex flex-col justify-center items-center rounded-md">
                <form className="flex flex-col w-2/3 my-5">
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} name="roomName" placeholder="room name" required />
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} name="hardwareId" placeholder="device id" required />
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" value={preferredTemperature} onChange={(e) => setPreferredTemperature(e.target.value)} name="temperature" placeholder="preferred temperature (°C)" min="5" max="40" required />
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" value={preferredHumidity} onChange={(e) => setPreferredHumidity(e.target.value)} name="humidity" placeholder="preferred humidity (%)" min="0" max="100" required />
                    <p className="mt-2 md:text-sm text-justify">*In order to create a room, a set of bought and installed hardware is required.</p>
                    <button className="bg-light-brown text-base w-64 h-16 mx-auto mt-5 py-5 rounded-md" onClick={handleAddRoom}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom;

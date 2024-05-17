import React from 'react';

function EditRoom({ room }) {
    const { name, temperature, humidity } = room;

    return (
        <div className="brown-gradient-y flex w-full lg:w-1/2 rounded-md shadow-md flex-col">
            <div className="min-h-24 w-full flex items-center ml-5 text-3xl lg:text-5xl font-bold text-white">EDIT ROOM</div>
            <div className="bg-white bg-opacity-15 h-full text-xs md:text-sm lg:text-base flex flex-col justify-center items-center rounded-md">
                <form className="flex flex-col w-2/3 my-5">
                    <div className="flex items-center">
                        <label htmlFor="roomName" className="mr-2 font-bold text-white">Room:</label>
                        <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="text" id="roomName" name="roomName" placeholder="Room name" defaultValue={name} required />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="temperature" className="mr-2 font-bold text-white">Temperature:</label>
                        <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="temperature" name="temperature" placeholder="Preferred temperature (°C)" min="5" max="40" defaultValue={temperature} required />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="humidity" className="mr-2 font-bold text-white">Humidity:</label>
                        <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="humidity" name="humidity" placeholder="Preferred humidity (%)" min="0" max="100" defaultValue={humidity} required />
                    </div>
                    <button className="bg-light-brown text-base w-64 h-16 mx-auto mt-5 py-5 rounded-md" type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default EditRoom;

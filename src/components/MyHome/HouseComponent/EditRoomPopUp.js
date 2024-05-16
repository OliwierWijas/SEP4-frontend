import React from 'react';

function EditRoom({ title, buttonText, room }) {
    // Destructure the room details
    const { name, temperature, humidity } = room;

    return (
        <div className="brown-gradient-y flex w-full lg:w-1/2 rounded-md shadow-md flex-col">
            <div className="min-h-24 w-full flex items-center ml-5 text-3xl lg:text-5xl font-bold text-white">{title}</div>
            <div className="bg-white bg-opacity-15 h-full text-xs md:text-sm lg:text-base flex flex-col justify-center items-center rounded-md">
                <form action="http://localhost:8080/createRoom" method="post" className="flex flex-col w-2/3 my-5">
                    {/* Populate input fields with room details */}
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="text" id="roomName" name="roomName" placeholder="room name" defaultValue={name} required />
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="temperature" name="temperature" placeholder="preffered temperature (°C)" min="5" max="40" defaultValue={temperature} required />
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="humidity" name="humidity" placeholder="preffered humidity (%)" min="0" max="100" defaultValue={humidity} required />
                    <button className="bg-light-brown text-base w-64 h-16 mx-auto mt-5 py-5 rounded-md" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default EditRoom;

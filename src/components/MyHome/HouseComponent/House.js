import React, { useEffect, useState } from 'react';
import Room from './Room.js';
import CreateRoom from './CreateRoomButton.js';
import Triangle from './Triangle.js';

function House({ rooms, setTemperature, setHumidity, setLightLevel, setRoom, setCreateRoomOpen, setEditRoomOpen }) {
    const [width, setWidth] = useState('');
    const [roomsList, setRoomsList] = useState(rooms);

    const handleDeleteRoom = (roomId) => {
        const updatedRoomsArray = roomsList.filter(room => room.id !== roomId);
        setRoomsList(updatedRoomsArray);
    };

    useEffect(() => {
        const restOfRooms2 = roomsList.length % 2;
        const restOfRooms3 = roomsList.length % 3;
        let newWidth = '';

        if (restOfRooms2 === 1) {
            newWidth = 'md:w-1/2';
        }

        if (restOfRooms3 === 0) {
            newWidth += ' lg:w-full';
        } else if (restOfRooms3 === 1) {
            newWidth += ' lg:w-2/3';
        } else {
            newWidth += ' lg:w-1/3';
        }

        setWidth(newWidth);
    }, [roomsList]);

    return (
        <div className="house-container mb-10" data-testid="house-container">
            <div className="triangle-container mx-auto flex justify-center">
                <Triangle />
            </div>
            <div className="house w-4/5 max-h-[478px] md:max-h-full flex flex-wrap justify-between mx-auto mt-1 pb-3 overflow-y-auto md:overflow-y-none scrollbar">
                {roomsList && roomsList.length > 0 && roomsList.map((room) => (
                    <div key={room.id} className='roomDiv flex w-full md:w-1/2 lg:w-1/3 px-1 my-1 justify-center'>
                        <Room
                            room={room}
                            setTemperature={setTemperature}
                            setHumidity={setHumidity}
                            setLightLevel={setLightLevel}
                            setRoom={setRoom}
                            setEditRoomOpen={() => setEditRoomOpen(room)}
                            onDelete={() => handleDeleteRoom(room.id)}
                        />
                    </div>
                ))}
                <div className={`flex w-full ${width} px-1 my-1`}>
                    <CreateRoom setCreateRoomOpen={setCreateRoomOpen} />
                </div>
            </div>
        </div>
    );
}

export default House;

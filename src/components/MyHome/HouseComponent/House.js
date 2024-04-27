import React from 'react';
import Room from './Room.js';
import CreateRoom from './CreateRoom.js';
import '../../../styles/House.css';
import Triangle from './Triangle.js';

function House({ rooms }) {
    const maxRoomsPerRow = 3;
    const minRoomWidth = 350;
    const gap = 16; 
    const totalGap = gap * (maxRoomsPerRow - 1);
    const roomWidth = `calc((100% - ${totalGap}px) / ${maxRoomsPerRow})`;

    return (
        <div className="house-container">
            <div className="triangle-container">
                <Triangle />
            </div>
            <div className="house">
                {rooms.map((room, index) => (
                    <div key={index} style={{ flexBasis: roomWidth }}>
                        <Room room={room} />
                    </div>
                ))}
                <div style={{ flex: "1", minWidth: `${minRoomWidth}px` }}>
                    <CreateRoom />
                </div>
            </div>
        </div>
    );
}

export default House;

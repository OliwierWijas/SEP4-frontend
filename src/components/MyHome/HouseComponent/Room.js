import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from 'react-icons/io5';
import '../../../styles/Room.css';

function Room({ room, setTemperature, setHumidity, setLightLevel, setRoom, onDelete, setEditRoomOpen }) {
  const { name, temperature, humidity, lightLevel } = room;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onClick = () => {
    setRoom(room)
  }

  return (
    <div
      className="room w-full flex flex-col justify-center bg-medium-brown items-center shadow-md rounded relative" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-testid="room"
    >
      <div className="edit-icon-wrapper absolute top-4 right-4 flex items-center">
        <FaRegEdit className="text-white mr-2" onClick={() => setEditRoomOpen(true)} data-testid="edit-room-button"/> 
        <IoTrashOutline className="text-white" onClick={onDelete}/> 
      </div>
      {isHovered ? (
        <div className="hover-content">
          <p className="font-bold text-white">Temperature: {temperature}</p>
          <p className="font-bold text-white">Humidity: {humidity}</p>
          <p className="font-bold text-white">Light Level: {lightLevel}</p>
        </div>
      ) : (
        <p className="font-bold text-white text-2xl">{name}</p>
      )}
    </div>
  );
}

export default Room;
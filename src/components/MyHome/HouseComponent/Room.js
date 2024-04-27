import React, { useState } from 'react';
import '../../../styles/Room.css';

function Room({ room }) {
  const { name, temperature, humidity, lightLevel } = room;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="room flex flex-col justify-center bg-medium-brown items-center mx-2 shadow-md rounded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      
    >
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

import React, { useState } from 'react';
import '../../../styles/Room.css';

function Room({ room, setTemperature, setHumidity, setLightLevel, setRoom }) {
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
      className="room w-full flex flex-col justify-center bg-medium-brown items-center shadow-md rounded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
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

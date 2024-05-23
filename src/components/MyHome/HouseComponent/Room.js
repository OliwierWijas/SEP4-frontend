import React, { useState, useContext } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from 'react-icons/io5';
import '../../../styles/Room.css';
import { AuthContext } from '../../../auth/AuthContext.js';

function Room({ room, setRoom, setEditRoomOpen, setDeleteRoomOpen }) {
  const { claims } = useContext(AuthContext)
  let isAuthenticated = Boolean(claims?.token);
  let isAdmin = Boolean(claims?.role === "Admin");

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <div
      className="room w-full flex flex-col justify-center bg-medium-brown items-center shadow-md rounded relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setRoom(room)}
      data-testid="room"
    >
      {isAuthenticated && isAdmin && (
        <div className="edit-icon-wrapper absolute top-4 right-4 flex items-center">
          <FaRegEdit className="text-white mr-2" onClick={() => setEditRoomOpen(true)} data-testid="edit-room-button" />
          <IoTrashOutline className="text-white" onClick={() => setDeleteRoomOpen(true)} data-testid="delete-room-button" />
        </div>
      )}
      {isHovered ? (
        <div className="hover-content">
          <p className="font-bold text-white">Temperature: {room?.tempValue}</p>
          <p className="font-bold text-white">Humidity: {room?.humiValue}</p>
          <p className="font-bold text-white">Light Level: {room?.lightValue}</p>
        </div>
      ) : (
        <p className="font-bold text-white text-2xl">{room?.name}</p>
      )}
    </div>
  )
}

export default Room;
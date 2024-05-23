import React, { useContext } from 'react';
import { useDeleteRoom } from '../../../hooks/room/useDeleteRoom.js';
import { AuthContext } from '../../../auth/AuthContext.js';

function DeleteRoom({ room, setIsOpen, refreshRoomData }) {
  const { claims } = useContext(AuthContext)
  const token = claims?.token
  const deleteRoom = useDeleteRoom()

  const onDelete = () => {
    deleteRoom(room?.deviceId, refreshRoomData, token)
    setIsOpen(false)
  }

    return (
        <div className="brown-gradient-y flex flex-col w-full h-60 lg:w-1/3 rounded-md shadow-md justify-center items-center">
            <div className="m-4 text-center">
            Are you sure you want to delete the room?
          </div>
          <div className="justify-center">
            <button className="text-base w-64 h-16 mx-auto mt-5 py-5 rounded-md" type="submit" onClick={onDelete} style={{backgroundColor:"#FFA7A7"}}>Delete</button>
          </div>
            
        </div>
    )
}

export default DeleteRoom;

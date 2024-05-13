import React from 'react';
import '../../../styles/CreateRoom.css';

function CreateRoomButton({ setCreateRoomOpen }) {

    return (
        <div onClick={() => setCreateRoomOpen(true)} className="createRoom flex w-full justify-center bg-white items-center shadow-md rounded">
            + Room
        </div>
    );
}

export default CreateRoomButton

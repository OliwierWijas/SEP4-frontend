import React from 'react';

function DeleteRoom() {

    return (
        <div className="brown-gradient-y flex flex-col w-full h-60 lg:w-1/3 rounded-md shadow-md justify-center items-center">
            <div className="m-4 text-center">
            Are you sure you want to delete the room?
          </div>
          <div className="justify-center">
            <button className="text-base w-64 h-16 mx-auto mt-5 py-5 rounded-md" type="submit" style={{backgroundColor:"#FFA7A7"}}>Delete</button>
          </div>
            
        </div>
    )
}

export default DeleteRoom;

import House from '../components/MyHome/HouseComponent/House.js';
import roomData from '../dummyData/RoomData.js'
import React from 'react';


function MyHome() {
    return (
      <div>
        <House rooms={roomData} /> 
      </div>
    );
  }
  
export default MyHome;
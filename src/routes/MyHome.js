import { useEffect, useState } from "react";
import RoomManagementComponent from "../components/MyHome/GraphComponent/RoomManagementComponent.js";
import BrownBreakline from "../components/BrownBreakline.js";
import House from "../components/MyHome/HouseComponent/House.js";
import { addDays } from 'date-fns';
import PopUp from "../components/PopUp.js";
import CreateRoom from "../components/MyHome/HouseComponent/CreateRoomPopUp.js";
import EditRoom from "../components/MyHome/HouseComponent/EditRoomPopUp.js";
import { useRoomData } from "../hooks/room/useRooms.js";
import { useTemperatureHistory } from "../hooks/conditions/useTemperatureHistory.js";
import DeleteRoom from "../components/MyHome/HouseComponent/ConfirmDeleteRoomPopUp.js";

function MyHome() {
  const [createRoomOpen, setCreateRoomOpen] = useState(false)
  const [editRoomOpen, setEditRoomOpen] = useState(false)
  const [deleteRoomOpen, setDeleteRoomOpen] = useState(false)

  const [editRoom, setEditRoom] = useState(null)
  const [deleteRoom, setDeleteRoom] = useState(null)

  const [room, setRoom] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Temperature");
  const [interval, setInterval] = useState(
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  );

  const [roomDataIndex, setRoomDataIndex] = useState(0)

  const RoomData = useRoomData(localStorage.getItem("houseId"), roomDataIndex)

  useEffect(() => {
    setRoom(RoomData.length > 0 ? RoomData[0] : null);
  }, [RoomData]);

  const TemperatureData = useTemperatureHistory(room?.deviceId, interval);
  const [graphData, setGraphData] = useState({
    labels: TemperatureData && TemperatureData[0] ? TemperatureData.map((data) => data.readAt) : [],
    datasets: [{
      label: selectedValue,
      data: TemperatureData && TemperatureData[0] ? TemperatureData.map((data) => data.value) : [],
      borderColor: '#C4B097'
    }]
  });

  const handleEditRoom = (room) => {
    setEditRoom(room);
    setEditRoomOpen(true);
  };

  const handleDeleteRoom = (room) => {
    setDeleteRoom(room)
    setDeleteRoomOpen(true)
  }



  return (
    <div>
      <PopUp isOpen={editRoomOpen} setIsOpen={setEditRoomOpen} testId="edit-room-popup">
        <EditRoom room={editRoom} refreshRoomData={setRoomDataIndex} />
      </PopUp>
      <PopUp isOpen={createRoomOpen} setIsOpen={setCreateRoomOpen} testId="create-room-popup">
        <CreateRoom refreshRoomData={setRoomDataIndex} />
      </PopUp >
      <PopUp isOpen={deleteRoomOpen} setIsOpen={setDeleteRoomOpen} testId="delete-room-popup">
        <DeleteRoom room={deleteRoom} setIsOpen={setDeleteRoomOpen} refreshRoomData={setRoomDataIndex}/>
      </PopUp>
      <House rooms={RoomData} setRoom={setRoom} setCreateRoomOpen={setCreateRoomOpen} setEditRoomOpen={handleEditRoom} setDeleteRoomOpen={handleDeleteRoom} />
      <BrownBreakline />
      <RoomManagementComponent data={graphData} setData={setGraphData} interval={interval} setInterval={setInterval} selectedValue={selectedValue} setSelectedValue={setSelectedValue} room={room} setRoom={setRoom} />
    </div>
  );
}

export default MyHome;

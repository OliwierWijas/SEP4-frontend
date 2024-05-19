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

function MyHome() {
  const [createRoomOpen, setCreateRoomOpen] = useState(false)
  const [editRoomOpen, setEditRoomOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [room, setRoom] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Temperature");
  const [interval, setInterval] = useState(
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  );

  localStorage.setItem("jwt", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiJlYTkyMmUzOS1kOGU0LTQyOTItOGI5OS1iNTRhYmEzYWQ2YWQiLCJpYXQiOiIwNS8xOS8yMDI0IDA2OjAxOjQwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3RVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTWVtYmVyIiwiSG91c2VJZCI6IiIsImV4cCI6MTcxNjEwMjEwMCwiaXNzIjoiSldUQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJKV1RTZXJ2aWNlQmxhem9yV2FzbUNsaWVudCJ9.dh2uu4OKy006GAVAgtanMoY3W3s3MrpVwtrU5hOO-u7jn5CsVKVrUnf-fb614MGWOQowGzF6oBC7SYULQV4tJw")

  const RoomData = useRoomData(localStorage.getItem("houseId"))

  useEffect(() => {
    setRoom(RoomData.length > 0 ? RoomData[0] : null);
  }, [RoomData]);

  const TemperatureData = useTemperatureHistory(room?.deviceId, interval);
  const [graphData, setGraphData] = useState({
    labels: TemperatureData && TemperatureData[0] ? TemperatureData.map((data) => data.date) : [],
    datasets: [{
      label: selectedValue,
      data: TemperatureData && TemperatureData[0] ? TemperatureData.map((data) => data.value) : [],
      borderColor: '#C4B097'
    }]
  });

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setEditRoomOpen(true);
  };

  return (
    <div>
      <PopUp isOpen={editRoomOpen} setIsOpen={setEditRoomOpen} testId="edit-room-popup">
        <EditRoom room={selectedRoom} />
      </PopUp>
      <PopUp isOpen={createRoomOpen} setIsOpen={setCreateRoomOpen} testId="create-room-popup">
        <CreateRoom />
      </PopUp>
      <House rooms={RoomData} setRoom={setRoom} setCreateRoomOpen={setCreateRoomOpen} setEditRoomOpen={handleEditRoom} />
      <BrownBreakline />
      <RoomManagementComponent data={graphData} setData={setGraphData} interval={interval} setInterval={setInterval} selectedValue={selectedValue} setSelectedValue={setSelectedValue} room={room} setRoom={setRoom} />
    </div>
  );
}

export default MyHome;

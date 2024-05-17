import { useEffect, useState } from "react";
import RoomManagementComponent from "../components/MyHome/GraphComponent/RoomManagementComponent.js";
import BrownBreakline from "../components/BrownBreakline.js";
import House from "../components/MyHome/HouseComponent/House.js";
import { addDays } from 'date-fns';
import { useTemperature } from "../hooks/mocks/useTemperatureMock.js";
import PopUp from "../components/PopUp.js";
import CreateRoom from "../components/MyHome/HouseComponent/CreateRoomPopUp.js";
import EditRoom from "../components/MyHome/HouseComponent/EditRoomPopUp.js";
import { useRoomData } from "../hooks/mocks/useRoomsMock.js";

function MyHome() {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const [editRoomOpen, setEditRoomOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);


  const RoomData = useRoomData(1);

  const [room, setRoom] = useState(RoomData.length > 0 ? RoomData[0] : null);
  const [selectedValue, setSelectedValue] = useState("Temperature");
  const [interval, setInterval] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const TemperatureData = useTemperature(room?.id, interval[0]);

  const [graphData, setGraphData] = useState({
    labels: TemperatureData && TemperatureData[0] ? TemperatureData.map((data) => data.date) : [],
    datasets: [{
      label: selectedValue,
      data: TemperatureData && TemperatureData[0] ? TemperatureData.map((data) => data.value) : [],
      borderColor: '#C4B097'
    }]
  });

  useEffect(() => {
    setRoom(RoomData && RoomData ? RoomData[0] : null);
  }, [RoomData]);

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
      <RoomManagementComponent data={graphData} setData={setGraphData} interval={interval} setInterval={setInterval} selectedValue={selectedValue} setSelectedValue={setSelectedValue} room={room} />
    </div>
  );
}

export default MyHome;

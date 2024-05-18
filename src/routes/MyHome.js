import { useEffect, useState } from "react";
import RoomManagementComponent from "../components/MyHome/GraphComponent/RoomManagementComponent.js";
import BrownBreakline from "../components/BrownBreakline.js";
import House from "../components/MyHome/HouseComponent/House.js";
import { addDays } from 'date-fns';
import { useTemperature } from "../hooks/mocks/useTemperatureMock.js";
import PopUp from "../components/PopUp.js";
import CreateRoom from "../components/MyHome/HouseComponent/CreateRoomPopUp.js";
import EditRoom from "../components/MyHome/HouseComponent/EditRoomPopUp.js";
import { useRoomData } from "../hooks/room/useRooms.js";
import { useLatestTemperature } from "../hooks/room/useLatestTemperature.js";
import { useLatestHumidity } from "../hooks/room/useLatestHumidity.js";
import { useLatestLightLevel } from "../hooks/room/useLatestLightLevel.js";

function MyHome() {
  const [createRoomOpen, setCreateRoomOpen] = useState(false)
  const [editRoomOpen, setEditRoomOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [room, setRoom] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Temperature");
  const [interval, setInterval] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  
  const RoomData = useRoomData(localStorage.getItem("houseId"))

  const defaultDeviceId = RoomData.length > 0 ? RoomData[0]?.deviceId : null;
  const latestTemperature = useLatestTemperature(defaultDeviceId);
  const latestHumidity = useLatestHumidity(defaultDeviceId);
  const latestLightLevel = useLatestLightLevel(defaultDeviceId);

  useEffect(() => {
    const defaultRoomId = RoomData.length > 0 ? RoomData[0]?.id : null
    const defaultName = RoomData.length > 0 ? RoomData[0]?.name : null
    const defaultPreferedTemperature = RoomData.length > 0 ? RoomData[0]?.preferedTemperature : null
    const defaultPreferedHumidity = RoomData.length > 0 ? RoomData[0]?.preferedHumidity : null
    const defaultRadiatorState = RoomData.length > 0 ? RoomData[0]?.radiatorState : null
  
    const defaultRoom = {
      deviceId : defaultDeviceId,
      id: defaultRoomId,
      name: defaultName,
      preferedTemperature: defaultPreferedTemperature,
      preferedHumidity: defaultPreferedHumidity,
      radiatorState: defaultRadiatorState,
      latestTemperature: latestTemperature === undefined ? latestTemperature : 0,
      latestHumidity : latestHumidity === undefined ? latestHumidity : 0,
      latestLightLevel : latestLightLevel === undefined ? latestLightLevel : 0
    }

    setRoom(defaultRoom);
  }, [RoomData, defaultDeviceId, latestTemperature, latestHumidity, latestLightLevel]);


  console.log(room)

  //const TemperatureData = useTemperature(room?.deviceId, interval[0]);
  const TemperatureData = []
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
      <RoomManagementComponent data={graphData} setData={setGraphData} interval={interval} setInterval={setInterval} selectedValue={selectedValue} setSelectedValue={setSelectedValue} room={room} />
    </div>
  );
}

export default MyHome;

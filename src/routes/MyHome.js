import { useEffect, useState } from "react"
import RoomManagementComponent from "../components/MyHome/GraphComponent/RoomManagementComponent.js";
import BrownBreakline from "../components/BrownBreakline.js";
import House from "../components/MyHome/HouseComponent/House.js";
import { addDays } from 'date-fns';
import { useTemperature } from "../hooks/mocks/useTemperatureMock.js";
import PopUp from "../components/PopUp.js";
import NotificationBoxComponent from "../components/MyProfile/NotificationBoxComponent.js";
import LockerPopUp from "../components/LockerPopUp.js"
import CreateEditRoom from "../components/MyHome/HouseComponent/CreateEditRoomPopUp.js";
import { useRoomData } from "../hooks/mocks/useRoomDataMock.js";

function MyHome() {
  const [createRoomOpen, setCreateRoomOpen] = useState(false)

  const RoomData = useRoomData(1)

  const [room, setRoom] = useState(RoomData.length > 0 ? RoomData[0] : null);
  const [selectedValue, setSelectedValue] = useState("Temperature");
  const [interval, setInterval] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  const TemperatureData = useTemperature(room?.id, interval[0])

  const [graphData, setGraphData] = useState({
    labels: TemperatureData && TemperatureData[0] ? TemperatureData.map((data) => data.date) : [],
    datasets: [{
      label: selectedValue,
      data: TemperatureData && TemperatureData[0] ? TemperatureData.map((data) => data.value) : [],
      borderColor: '#C4B097'
    }]
  })

  useEffect(() => {
    setRoom(RoomData && RoomData ? RoomData[0] : null)
  }, [RoomData])

  return (
    <div>
     
        <LockerPopUp/>
      <PopUp isOpen={createRoomOpen} setIsOpen={setCreateRoomOpen}>
        <CreateEditRoom title="CREATE ROOM" buttonText="Create" />
      </PopUp>
      <House rooms={RoomData} setRoom={setRoom} setCreateRoomOpen={setCreateRoomOpen}/>
      <BrownBreakline />
      <RoomManagementComponent data={graphData} setData={setGraphData} interval={interval} setInterval={setInterval} selectedValue={selectedValue} setSelectedValue={setSelectedValue} room={room} />
    </div>
  );
}

export default MyHome;

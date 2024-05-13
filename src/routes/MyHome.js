import { useEffect, useState } from "react"
import RoomManagementComponent from "../components/MyHome/GraphComponent/RoomManagementComponent.js";
import BrownBreakline from "../components/BrownBreakline.js";
import House from "../components/MyHome/HouseComponent/House.js";
import { addDays } from 'date-fns';
import { useTemperature } from "../hooks/useTemperature.js";
import roomData from "../dummyData/RoomData.js";

function MyHome() {
  const RoomData = roomData

  const [room, setRoom] = useState(RoomData.length > 0 ? RoomData[0] : null);
  const [temperature, setTemperature] = useState("0°C")
  const [humidity, setHumidity] = useState("0%")
  const [lightLevel, setLightLevel] = useState("0%")

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
    setRoom(RoomData && RoomData ? RoomData[0] : null )
  }, [RoomData])

  useEffect(() => {
    setTemperature(room?.temperature + "°C")
    setHumidity(room?.humidity + "%")
    setLightLevel(room?.lightLevel + "%")
  }, [room])

  return (
    <div>
      <House rooms={RoomData} setTemperature={setTemperature} setHumidity={setHumidity} setLightLevel={setLightLevel} setRoom={setRoom} />
      <BrownBreakline></BrownBreakline>
      <RoomManagementComponent data={graphData} setData={setGraphData} temperature={temperature} humidity={humidity} lightLevel={lightLevel} interval={interval} setInterval={setInterval} selectedValue={selectedValue} setSelectedValue={setSelectedValue} room={room} />
    </div>
  );
}

export default MyHome;

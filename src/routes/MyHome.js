import React from 'react';
import { useState } from "react"
import RoomManagementComponent from "../components/MyHome/GraphComponent/RoomManagementComponent.js";
import BrownBreakline from "../components/BrownBreakline.tsx";
import House from "../components/MyHome/HouseComponent/House.js";
import dummyData from "../dummyData/RoomData.js";
import { addDays } from 'date-fns';
import { TemperatureData } from "../dummyData/Temperature.js"

function MyHome() {
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

  const [graphData, setGraphData] = useState({
    labels: TemperatureData.map((data) => data.date),
    datasets: [{
      label: selectedValue,
      data: TemperatureData.map((data) => data.value),
      borderColor: '#C4B097'
    }]
  })

  return (
    <>
      <House rooms={dummyData} setTemperature={setTemperature} setHumidity={setHumidity} setLightLevel={setLightLevel} />
      <BrownBreakline></BrownBreakline>
      <RoomManagementComponent data={graphData} setData={setGraphData} temperature={temperature} humidity={humidity} lightLevel={lightLevel} interval={interval} setInterval={setInterval} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
    </>
  );
}

export default MyHome;

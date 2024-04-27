import React from "react"
import "../index.css"
import { useState } from "react"
import DataReadingComponent from "./DataReadingComponent.js"
import DateIntervalPicker from "./DateIntervalPicker.js"
import GraphComponent from "./GraphComponent.js"
import { addDays } from 'date-fns';
import { Data } from "./Data.js"

function RoomManagementComponent() {
    const [temperature, setTemperature] = useState("0°C")
    const [humidity, setHumidity] = useState("0%")
    const [lightLevel, setLightLevel] = useState("0%")
    const [selectedLabel, setSelectedLabel] = useState("Temperature")

    const [interval, setInterval] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    const [data, setData] = useState({
        labels: Data.map((data) => data.date),
        datasets: [{
            label: selectedLabel,
            data: Data.map((data) => data.value),
            borderColor: '#C4B097'
        }]
    })

    return (
        <div className="w-4/5 flex flex-col justify-center mx-auto">
            <div className="reading-container flex flex-col lg:flex-row">
                <DataReadingComponent readingType="Temperature" value={temperature} />
                <DataReadingComponent readingType="Humidity" value={humidity} />
                <DataReadingComponent readingType="Light Level" value={lightLevel} />
            </div>
            <div className="graph-filter flex flex-col lg:flex-row-reverse">
                <div className="datepicker-container flex w-full lg:w-1/2 m-2">
                    <DateIntervalPicker interval={interval} setInterval={setInterval} />
                </div>
                <div className="graph-container flex w-full lg:w-1/2 m-2">
                    <GraphComponent label="Temperature" data={data} setData={setData} />
                </div>
            </div>
        </div>
    )
}

export default RoomManagementComponent
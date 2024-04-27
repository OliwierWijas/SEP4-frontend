import React from "react"
import "../../../index.css"
import { useState, useEffect } from "react"
import DataReadingComponent from "./DataReadingComponent.js"
import DateIntervalPicker from "./DateIntervalPicker.js"
import GraphComponent from "./GraphComponent.js"
import DropdownList from "./DropdownList.js"
import { addDays } from 'date-fns';
import { TemperatureData } from "./Temperature.js"
import { HumidityData } from "./Humidity.js"
import { LightData } from "./LightData.js"
import { parse, format } from 'date-fns';

function RoomManagementComponent() {
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

    const [data, setData] = useState({
        labels: TemperatureData.map((data) => data.date),
        datasets: [{
            label: selectedValue,
            data: TemperatureData.map((data) => data.value),
            borderColor: '#C4B097'
        }]
    })
    
    useEffect(() => {
        const startDate = interval[0].startDate
        const endDate = interval[0].endDate

        const filterData = () => {
            let newData = [];

            if (selectedValue === "Temperature") {
                newData = TemperatureData.filter(data => {
                    const dataDate = parse(data.date, 'yyyy-MM-dd', new Date());
                    return dataDate >= startDate && dataDate <= endDate;
                });
            } 
            else if (selectedValue === "Humidity") {
                newData = HumidityData.filter(data => {
                    const dataDate = parse(data.date, 'yyyy-MM-dd', new Date());
                    return dataDate >= startDate && dataDate <= endDate;
                });
            } 
            else if (selectedValue === "Light Level") {
                newData = LightData.filter(data => {
                    const dataDate = parse(data.date, 'yyyy-MM-dd', new Date());
                    return dataDate >= startDate && dataDate <= endDate;
                });
            }

            return newData
        }

        const updateData = (newData) => {
            setData(prevData => ({
                ...prevData,
                labels: newData.map(data => format(parse(data.date, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy')),
                datasets: [{
                    ...prevData.datasets[0],
                    label: selectedValue,
                    data: newData.map(data => data.value),
                }]
            }))
        }

        updateData(filterData())
    }, [selectedValue, interval[0].startDate, interval[0].endDate]);

    return (
        <div className="w-full md:w-4/5 flex flex-col justify-center mx-auto">
            <div className="reading-container flex flex-col lg:flex-row">
                <DataReadingComponent readingType="Temperature" value={temperature} />
                <DataReadingComponent readingType="Humidity" value={humidity} />
                <DataReadingComponent readingType="Light Level" value={lightLevel} />
            </div>
            <div className="graph-filter flex flex-col lg:flex-row-reverse">
                <div className="datepicker-container flex w-full lg:w-1/3 m-2 flex flex-col flex-end">
                    <DateIntervalPicker interval={interval} setInterval={setInterval} />
                    <DropdownList selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                </div>
                <div className="graph-container flex w-full lg:w-4/5 m-2">
                    <GraphComponent data={data} />
                </div>
            </div>
        </div>
    )
}

export default RoomManagementComponent
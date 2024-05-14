import React, { useEffect, useState } from "react"
import "../../../index.css"
import DataReadingComponent from "./DataReadingComponent.js"
import DateIntervalPicker from "./DateIntervalPicker.js"
import GraphComponent from "./GraphComponent.js"
import DropdownList from "./DropdownList.js"
import RoomController from "./RoomController.js"
import { useTemperature } from "../../../hooks/useTemperature.js"
import { useHumidity } from "../../../hooks/useHumidity.js"
import { useLightLevel } from "../../../hooks/useLightLevel.js"
import { parse, format } from 'date-fns';

function RoomManagementComponent({ data, setData, temperature, humidity, lightLevel, interval, setInterval, selectedValue, setSelectedValue, room }) {
    const [radiatorStatus, setRadiatorStatus] = useState(0)
    const [windowsStatus, setWindowsStatus] = useState(0)
    const [lightStatus, setLightStatus] = useState(0)

    const TemperatureData = useTemperature(room?.id, interval[0])
    const HumidityData = useHumidity(room?.id, interval[0])
    const LightData = useLightLevel(room?.id, interval[0])

    useEffect(() => {
        if (TemperatureData && HumidityData && LightData) {
            const startDate = interval[0].startDate
            const endDate = interval[0].endDate

            const filterData = () => {
                let newData = [];

                if (selectedValue === "Temperature") {
                    newData = TemperatureData && TemperatureData[0] && TemperatureData.filter(data => {
                        const dataDate = parse(data.date, 'yyyy-MM-dd', new Date());
                        return dataDate >= startDate && dataDate <= endDate;
                    });
                }
                else if (selectedValue === "Humidity") {
                    newData = HumidityData && HumidityData[0] && HumidityData.filter(data => {
                        const dataDate = parse(data.date, 'yyyy-MM-dd', new Date());
                        return dataDate >= startDate && dataDate <= endDate;
                    });
                }
                else if (selectedValue === "Light Level") {
                    newData = LightData && LightData[0] && LightData.filter(data => {
                        const dataDate = parse(data.date, 'yyyy-MM-dd', new Date());
                        return dataDate >= startDate && dataDate <= endDate;
                    });
                }

                return newData
            }

            const updateData = (newData) => {
                setData(prevData => ({
                    ...prevData,
                    labels: newData && newData[0] && newData.map(data => format(parse(data.date, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy')),
                    datasets: [{
                        ...prevData.datasets[0],
                        label: selectedValue,
                        data: newData && newData[0] && newData.map(data => data.value),
                    }]
                }))
            }

            updateData(filterData())
        }
    }, [selectedValue, TemperatureData, HumidityData, LightData, interval, setData]);

    return (
        <>
            <div className="w-full md:w-4/5 flex flex-col justify-center mx-auto">
                <div style={{ color: "#837058" }} className="text-2xl ml-2 my-3 font-bold opacity-85">{room?.name}</div>
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
                <div>
                    <RoomController radiatorStatus={radiatorStatus} setRadiatorStatus={setRadiatorStatus} windowsStatus={windowsStatus} setWindowsStatus={setWindowsStatus} lightStatus={lightStatus} setLightStatus={setLightStatus} />
                </div>
            </div>
        </>
    )
}

export default RoomManagementComponent
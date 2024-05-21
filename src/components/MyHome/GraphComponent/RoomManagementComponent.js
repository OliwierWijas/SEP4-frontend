import React, { useEffect } from "react"
import "../../../index.css"
import DataReadingComponent from "./DataReadingComponent.js"
import DateIntervalPicker from "./DateIntervalPicker.js"
import GraphComponent from "./GraphComponent.js"
import DropdownList from "./DropdownList.js"
import RoomController from "./RoomController.js"
import { useTemperatureHistory } from "../../../hooks/conditions/useTemperatureHistory.js"
import { useHumidityHistory } from "../../../hooks/conditions/useHumidityHistory.js"
import { useLightLevelHistory } from "../../../hooks/conditions/useLightLevelHistory.js"
import { parse, format } from 'date-fns';

function RoomManagementComponent({ data, setData, interval, setInterval, selectedValue, setSelectedValue, room, setRoom }) {
    const TemperatureData = useTemperatureHistory(room?.deviceId, interval)
    const HumidityData = useHumidityHistory(room?.deviceId, interval)
    const LightData = useLightLevelHistory(room?.deviceId, interval)

    useEffect(() => {
        if (TemperatureData && HumidityData && LightData) {

            const filterData = () => {
                let newData = [];

                if (selectedValue === "Temperature") {
                    newData = TemperatureData ?? null
                }
                else if (selectedValue === "Humidity") {
                    newData = HumidityData ?? null
                }
                else if (selectedValue === "Light Level") {
                    newData = LightData ?? null
                }

                return newData
            }

            const updateData = (newData) => {
                setData(prevData => ({
                    ...prevData,
                    labels: newData && newData[0] && newData.map(data => format(parse(data.readAt, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy')),
                    datasets: [{
                        ...prevData?.datasets[0],
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
                <div style={{ color: "#837058" }} className="text-2xl ml-2 my-3 font-bold opacity-85" data-testid="room-name-header">{room?.name}</div>
                <div className="reading-container flex flex-col lg:flex-row">
                    <DataReadingComponent readingType="Temperature" value={room?.latestTemperature + "°C"} />
                    <DataReadingComponent readingType="Humidity" value={room?.latestHumidity + "%"} />
                    <DataReadingComponent readingType="Light Level" value={room?.latestLightLevel + "%"} />
                </div>
                <div className="graph-filter flex flex-col lg:flex-row-reverse">
                    <div className="datepicker-container flex w-full lg:w-1/3 m-2 flex flex-col flex-end">
                        <DateIntervalPicker interval={interval} setInterval={setInterval} />
                        <DropdownList selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                    </div>
                    <div className="graph-container flex w-full lg:w-4/5 m-2" data-testid="graph">
                        <GraphComponent data={data} />
                    </div>
                </div>
                <div>
                    <RoomController room={room} setRoom={setRoom}/>
                </div>
            </div>
        </>
    )
}

export default RoomManagementComponent
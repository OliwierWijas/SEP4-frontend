import React from 'react';
import Toggle from '../Toggle.js';

function RoomController() {

    return (
        <>
            <div className="flex justify-between my-7">
                <div className="flex items-center">
                    <p style={{ color: "#a79277" }} className="font-semibold">Radiator</p>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2">▲</button>
                    <div style={{ height: "40px", width: "35px", border: "0.5px solid #C4B098", color: "#C4B098" }} className="flex justify-center items-center font-bold text-xl shadow-md rounded">1</div>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2">▼</button>
                </div>
                <div className="flex items-center">
                <p style={{ color: "#a79277" }} className="font-semibold mx-2">Windows</p>
                    <Toggle></Toggle>
                </div>
                <div className="flex items-center">
                    <p style={{ color: "#a79277" }} className="font-semibold">Light level</p>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2">▲</button>
                    <div style={{ height: "40px", width: "35px", border: "0.5px solid #C4B098", color: "#C4B098" }} className="flex justify-center items-center font-bold text-xl shadow-md rounded">1</div>
                    <button style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white shadow-md px-2 mx-2">▼</button>
                </div>
            </div>
        </>
    );
}

export default RoomController;

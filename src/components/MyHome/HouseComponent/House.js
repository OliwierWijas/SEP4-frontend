import React from 'react';
import Room from './Room.js';
import CreateRoom from './CreateRoom.js';
import '../../../styles/House.css';
import Triangle from './Triangle.js';
import { useEffect, useState } from 'react';


function House({ rooms }) {
    const [width, setWidth] = useState('')

    useEffect(() => {
        const restOfRooms = rooms.length%3;
        let newWidth
        if (restOfRooms === 0 ) {
            newWidth = `md:w-1/2 lg:w-full`
        }
        else if (restOfRooms === 1 ) {
            newWidth = `md:1/2 lg:w-2/3`
        }
        else   {
            newWidth = `lg:w-1/3`
        }
        setWidth(newWidth)
    }, [rooms])
    
    return (
        <div className="house-container" data-testid="house-container">
            <div className="triangle-container">
                <Triangle />
            </div>
            <div className="house w-4/5 flex flex-wrap justify-between">
                {rooms.map((room, index) => (
                    <div key={index} className='roomDiv flex w-full md:w-1/2 lg:w-1/3 px-1 my-1 justify-center'>
                        <Room room={room} />
                    </div>
                ))}
                <div className={`flex w-full ${width} px-1 my-1`}>
                    <CreateRoom />
                </div>
            </div>
        </div>
    );
}

export default House;

import React from "react"
import "../../../index.css"

interface DataReading {
  readingType: string
  value: number
}

function DataReadingComponent( { readingType, value } : DataReading) {
    return (
      <div className="flex flex-col justify-center bg-light-brown items-center w-full lg:w-1/3 h-28 mx-2 my-2 shadow-md rounded">
        <div className="text-xl font-semibold text-white">{readingType}:</div>
        <div className="text-xl font-semibold text-white">{value}</div>
      </div>
    )
  }
  
export default DataReadingComponent
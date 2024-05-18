import React from "react"
import "../../../index.css"

function DataReadingComponent( { readingType, value }) {
    return (
      <div className="flex flex-col justify-center items-center w-full lg:w-1/3 h-28 mx-2 my-2 shadow-md rounded" style={{backgroundColor:"#D8BCA8"}}>
        <div className="text-xl font-semibold text-white">{readingType}:</div>
        <div className="text-xl font-semibold text-white">{value}</div>
      </div>
    )
  }
  
export default DataReadingComponent
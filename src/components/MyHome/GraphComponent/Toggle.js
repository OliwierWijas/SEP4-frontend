import React from "react";

export default function Toggle({ status, setStatus }) {

  const ToggleChange = () => {
    setStatus(!status);
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={status}
        onChange={ToggleChange}
        id="toggle"
        data-testid="toggleId"
        className="sr-only"
      />
      <label
        htmlFor="toggle"
        className="block w-14 h-8 sm:w-16 sm:h-10 md:w-20 md:h-12 lg:w-24 lg:h-14 rounded-full cursor-pointer "
        style={{border: "0.5px solid #C4B098" }}
        >
        <div style={{backgroundColor: "rgb(167, 146, 119)"}} className={`absolute top-1 left-1 md:top-2 md:left-2 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white rounded-full transition-transform duration-250 text-white transform ${status ? "translate-x-full" : ""}`}>
          {status ? "C" : "O"}
        </div>
      </label>
    </div>
  );
}

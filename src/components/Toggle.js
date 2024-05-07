import React, { useState } from 'react';

export default function Toggle(){
  const [isToggled, setIsToggled] = useState(false);

  const ToggleChange = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={isToggled}
        onChange={ToggleChange}
        id="toggle"
        className="sr-only"
      />
      <label htmlFor="toggle" className="block w-14 h-8 sm:w-16 sm:h-10 md:w-20 md:h-12 lg:w-24 lg:h-14 rounded-full cursor-pointer" style={{backgroundColor: "#ACE2E1"}}>
        <div className={`absolute left-2 top-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white rounded-full transition-transform duration-250 transform ${isToggled ? 'translate-x-full' : ''}`}></div>
      </label>
    </div>
  );
};

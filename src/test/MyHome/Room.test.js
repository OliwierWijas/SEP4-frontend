import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Room from '../../components/MyHome/HouseComponent/Room.js';


  it('renders room name when not hovered', () => {
    const roomData = {
      name: 'Bedroom',
      temperature: '23°C',
      humidity: '50%',
      lightLevel: '3%',
    };
    render(<Room room={roomData} />);
    expect(screen.getByText(roomData.name)).toBeInTheDocument();
  });

  it('renders temperature, humidity, and light level when hovered', () => {
    const roomData = {
      name: 'Bedroom',
      temperature: '23°C',
      humidity: '50%',
      lightLevel: '3%',
    };
    
    render(<Room room={roomData} />);
    expect(screen.getByText(roomData.name)).toBeInTheDocument();
    
    fireEvent.mouseEnter(screen.getByText(roomData.name));
    
    expect(screen.getByText(`Temperature: ${roomData.temperature}`)).toBeInTheDocument();
    expect(screen.getByText(`Humidity: ${roomData.humidity}`)).toBeInTheDocument();
    expect(screen.getByText(`Light Level: ${roomData.lightLevel}`)).toBeInTheDocument();
  });

  /*it('calls onClick function when clicked', () => {
    // Mock functions for setTemperature, setHumidity, and setLightLevel
    const setTemperature = jest.fn();
    const setHumidity = jest.fn();
    const setLightLevel = jest.fn();
    
    // Room data
    const roomData = {
      name: 'Bedroom',
      temperature: '23°C',
      humidity: '50%',
      lightLevel: '3%',
    };
    
    // Render the Room component with mock functions as props
    render(
      <Room
        room={roomData}
        setTemperature={setTemperature}
        setHumidity={setHumidity}
        setLightLevel={setLightLevel}
      />
    );
    
    // Simulate click event on the room element
    fireEvent.click(screen.getByText(roomData.name));
    
    // Assertions
    expect(setTemperature).toHaveBeenCalledWith(roomData.temperature);
    expect(setHumidity).toHaveBeenCalledWith(roomData.humidity);
    expect(setLightLevel).toHaveBeenCalledWith(roomData.lightLevel);

  });
  */

  

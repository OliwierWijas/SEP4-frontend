import React from 'react';
import { render, screen } from '@testing-library/react';
import House from '../../../components/MyHome/HouseComponent/House.js';

describe('House component', () => {
  const rooms = [
    { name: 'Bedroom1', temperature: '23°C', humidity: '50%', lightLevel: '3%' },
    { name: 'Bedroom2', temperature: '22°C', humidity: '45%', lightLevel: '4%' },
    { name: 'Livingroom', temperature: '24°C', humidity: '55%', lightLevel: '2%' },
  ];

  const mockSetTemperature = jest.fn();
  const mockSetHumidity = jest.fn();
  const mockSetLightLevel = jest.fn();

  it('renders the house container', () => {
    render(
      <House
        rooms={rooms}
        setTemperature={mockSetTemperature}
        setHumidity={mockSetHumidity}
        setLightLevel={mockSetLightLevel}
      />
    );

    const houseContainer = screen.getByTestId('house-container');
    expect(houseContainer).toBeInTheDocument();
  });

  it('renders the correct number of rooms', () => {
    render(
      <House
        rooms={rooms}
        setTemperature={mockSetTemperature}
        setHumidity={mockSetHumidity}
        setLightLevel={mockSetLightLevel}
      />
    );

    const roomElements = screen.getAllByTestId('room');
    expect(roomElements.length).toBe(rooms.length);
  });
});

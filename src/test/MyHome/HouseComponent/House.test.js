import React from 'react';
import { render, screen } from '@testing-library/react';
import House from '../../../components/MyHome/HouseComponent/House.js';
import roomData from '../../../dummyData/RoomData.js';

describe('House component', () => {
  const rooms = roomData

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

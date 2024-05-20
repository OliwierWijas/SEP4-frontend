import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Room from '../../../components/MyHome/HouseComponent/Room.js';

jest.mock('../../../hooks/room/useDeleteRoom.js', () => ({
  useDeleteRoom: jest.fn(() => jest.fn())
}));

const roomData = {
  deviceId: '1',
  name: 'Living Room',
  latestTemperature: 25,
  latestHumidity: 50,
  latestLightLevel: 75
};

describe('Room component', () => {
  let mockDeleteRoom
  
  beforeEach(() => {
    mockDeleteRoom = require('../../../hooks/room/useDeleteRoom.js').useDeleteRoom;
    mockDeleteRoom.mockReturnValue(jest.fn());
  })

  it('renders room name when not hovered', () => {
    render(<Room room={roomData} />);
    expect(screen.getByText('Living Room')).toBeInTheDocument();
  });

  it('renders room details when hovered', () => {
    render(<Room room={roomData} />);
    const roomElement = screen.getByTestId('room');
    fireEvent.mouseEnter(roomElement);
    expect(screen.getByText('Temperature: 25')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 50')).toBeInTheDocument();
    expect(screen.getByText('Light Level: 75')).toBeInTheDocument();
  });

  it('calls setRoom when clicked', () => {
    const setRoomMock = jest.fn();
    render(<Room room={roomData} setRoom={setRoomMock} />);
    const roomElement = screen.getByTestId('room');
    fireEvent.click(roomElement);
    expect(setRoomMock).toHaveBeenCalledWith(roomData);
  });

  it('calls setEditRoomOpen when edit icon is clicked', () => {
    const setRoomMock = jest.fn();
    const setEditRoomOpenMock = jest.fn()
    render(<Room room={roomData} setEditRoomOpen={setEditRoomOpenMock} setRoom={setRoomMock} />);
    const editRoomButton = screen.getByTestId('edit-room-button');
    fireEvent.click(editRoomButton);
    expect(setEditRoomOpenMock).toHaveBeenCalledWith(true);
  });

  it('calls deleteRoom when delete icon is clicked', () => {
    const setRoomMock = jest.fn();
    render(<Room room={roomData} setRoom={setRoomMock} />);
    const deleteRoomButton = screen.getByTestId('delete-room-button');
    fireEvent.click(deleteRoomButton);
    expect(mockDeleteRoom()).toHaveBeenCalledWith('1');
  });
});

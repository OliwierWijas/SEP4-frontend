import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Room from '../../../components/MyHome/HouseComponent/RoomComponent.js';
import { AuthContext } from '../../../auth/AuthContext.js';

const roomData = {
  deviceId: '1',
  name: 'Living Room',
  tempValue: 25,
  humiValue: 50,
  lightValue: 75
}

describe('Room component', () => {
  const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <AuthContext.Provider value={providerProps}>
        {ui}
      </AuthContext.Provider>,
      renderOptions
    )
  }

  const providerProps = { claims: { token: 'mock-token', role: "Admin" } }

  it('renders room name when not hovered', () => {
    renderWithAuthContext(<Room room={roomData} />, { providerProps })
    expect(screen.getByText('Living Room')).toBeInTheDocument()
  })

  it('renders room details when hovered', () => {
    renderWithAuthContext(<Room room={roomData} />, { providerProps })
    const roomElement = screen.getByTestId('room')
    fireEvent.mouseEnter(roomElement)
    expect(screen.getByText('Temperature: 25')).toBeInTheDocument()
    expect(screen.getByText('Humidity: 50')).toBeInTheDocument()
    expect(screen.getByText('Light Level: 75')).toBeInTheDocument()
  })

  it('calls setRoom when clicked', () => {
    const setRoomMock = jest.fn()
    renderWithAuthContext(<Room room={roomData} setRoom={setRoomMock} />, { providerProps })
    const roomElement = screen.getByTestId('room')
    fireEvent.click(roomElement)
    expect(setRoomMock).toHaveBeenCalledWith(roomData)
  })

  it('calls setEditRoomOpen when edit icon is clicked', () => {
    const setRoomMock = jest.fn()
    const setEditRoomOpenMock = jest.fn()
    renderWithAuthContext(<Room room={roomData} setEditRoomOpen={setEditRoomOpenMock} setRoom={setRoomMock} />, { providerProps })
    const editRoomButton = screen.getByTestId('edit-room-button')
    fireEvent.click(editRoomButton)
    expect(setEditRoomOpenMock).toHaveBeenCalledWith(true)
  })
})

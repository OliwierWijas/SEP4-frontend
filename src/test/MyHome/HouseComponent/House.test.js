import React from 'react'
import { render, screen } from '@testing-library/react'
import House from '../../../components/MyHome/HouseComponent/HouseComponent.js'
import roomData from '../../../dummyData/RoomData.js'
import { AuthContext } from '../../../auth/AuthContext.js'

describe('House component', () => {
  const rooms = roomData

  const mockSetTemperature = jest.fn()
  const mockSetHumidity = jest.fn()
  const mockSetLightLevel = jest.fn()

  const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <AuthContext.Provider value={providerProps}>
        {ui}
      </AuthContext.Provider>,
      renderOptions
    )
  }

  it('renders the house container', () => {
    const providerProps = { claims: { token: 'mock-token' } }
    renderWithAuthContext(
      <House
        rooms={rooms}
        setTemperature={mockSetTemperature}
        setHumidity={mockSetHumidity}
        setLightLevel={mockSetLightLevel}
      />, { providerProps })

    const houseContainer = screen.getByTestId('house-container')
    expect(houseContainer).toBeInTheDocument()
  })

  it('renders the correct number of rooms', () => {
    const providerProps = { claims: { token: 'mock-token' } }
    renderWithAuthContext(
      <House
        rooms={rooms}
        setTemperature={mockSetTemperature}
        setHumidity={mockSetHumidity}
        setLightLevel={mockSetLightLevel}
      />, { providerProps })

    const roomElements = screen.getAllByTestId('room')
    expect(roomElements.length).toBe(rooms.length)
  })
})

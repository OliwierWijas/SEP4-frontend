import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import MyHome from '../../routes/MyHome.js'
import { Chart } from 'chart.js';
import 'jest-canvas-mock';
import { useRoomData } from '../../hooks/room/useRooms.js';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

jest.mock("../../hooks/room/useRooms.js", () => ({
  useRoomData: jest.fn(),
}))

describe('myHome Component Tests', () => {
  jest.mock("../../hooks/conditions/useTemperatureHistory.js", () => ({
    useTemperature: jest.fn(),
  }))

  let useRoomsMock

  beforeEach(() => {
    useRoomsMock = require('../../hooks/room/useRooms.js').useRoomData;
    useRoomsMock.mockReturnValue([{ id: 1, deviceId: 1, name: "Living Room", latestTemperature: "23", latestHumidity: 35, latestLightLevel: 100, radiatorState: 1, isWindowOpen: true, lightLevel: 4 }, { id: 2, deviceId: 3, name: "Hall", latestTemperature: "20", latestHumidity: 67, latestLightLevel: 50, radiatorState: 4, isWindowOpen: true, lightLevel: 2 }]);
  })

  it('renders without crashing', async () => {
    render(<MyHome />)
    expect(await screen.findByText('Temperature')).toBeInTheDocument()
    expect(await screen.findByTestId('create-room-popup')).toBeInTheDocument()
  })

  it('room selection updates state', async () => {
    render(<MyHome />)
    const rooms = screen.getAllByTestId('room');
    expect(rooms.length).toBe(2);
    fireEvent.click(rooms[0])
    expect(screen.getByTestId('room-name-header')).toContainHTML("Living Room")
    fireEvent.click(rooms[1])
    expect(screen.getByTestId('room-name-header')).toContainHTML("Hall")
  })

  it('temperature data is fetched and displayed', async () => {
    render(<MyHome />)
    expect(await screen.findByText('23')).toBeInTheDocument()
  })

  /*it('graph data updates based on room and interval', async () => {
    render(<MyHome />)
    fireEvent.click(screen.queryAllByTestId('room')[0])
    expect(await screen.findByText('25')).toBeInTheDocument()
  })

  it('create room pop-up opens and closes', async () => {
    render(<MyHome />)
    fireEvent.click(await screen.findByTestId('create-room-button'))

    const popupChild = await screen.findByTestId('create-room-popup')
    expect(popupChild).toBeInTheDocument()
    expect(popupChild).toHaveClass('z-10')

    const close = (await screen.findAllByTestId('close-popup'))[1]
    expect(close).toBeInTheDocument()
    fireEvent.click(close)

    expect(popupChild).toHaveClass('z-0')
  })

  it('edit room pop-up opens and closes', async () => {
    render(<MyHome />)
    const editButton = (await screen.findAllByTestId('edit-room-button'))[0]
    expect(editButton).toBeInTheDocument()
    fireEvent.click(editButton)

    const popupChild = await screen.findByTestId('edit-room-popup')
    expect(popupChild).toBeInTheDocument()
    expect(popupChild).toHaveClass('z-10')

    const close = (await screen.findAllByTestId('close-popup'))[0]
    expect(close).toBeInTheDocument()
    fireEvent.click(close)

    expect(popupChild).toHaveClass('z-0')
  })

  it('graph data updates correctly with multiple temperature data points', async () => {
    jest.mock('../../hooks/useTemperature.js', () => ({
      useTemperature: jest.fn(() => [
        { date: new Date('2024-05-01'), value: 20 },
        { date: new Date('2024-05-02'), value: 22 },
        { date: new Date('2024-05-03'), value: 25 },
      ]),
    }))
    render(<MyHome />);
    expect(await screen.findByText('20')).toBeInTheDocument()
    expect(await screen.findByText('22')).toBeInTheDocument()
    expect(await screen.findByText('25')).toBeInTheDocument()
  })*/
})
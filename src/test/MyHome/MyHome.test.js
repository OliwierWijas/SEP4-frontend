import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import MyHome from '../../routes/MyHome.js'
import { Chart } from 'chart.js';
import 'jest-canvas-mock';
import { useRoomData } from '../../hooks/room/useRooms.js';
import { useTemperatureHistory } from '../../hooks/conditions/useTemperatureHistory.js';
import { addDays } from 'date-fns';

jest.mock('react-chartjs-2', () => ({
  Line: () => <div>
    <p>-1°C</p>
    <p>-5°C</p>
    <p>5°C</p>
  </div>,
}));

jest.mock("../../hooks/room/useRooms.js", () => ({
  useRoomData: jest.fn(),
}))

describe('myHome Component Tests', () => {
  jest.mock("../../hooks/conditions/useTemperatureHistory.js", () => ({
    useTemperatureHistory: jest.fn(),
  }))

  let useRoomsMock, useTemperatureMock

  beforeEach(() => {
    useRoomsMock = require('../../hooks/room/useRooms.js').useRoomData;
    useRoomsMock.mockReturnValue([{ id: 1, deviceId: 1, name: "Living Room", tempValue: "23", humiValue: 35, lightValue: 100, radiatorState: 1, isWindowOpen: true, lightLevel: 4 }, { id: 2, deviceId: 3, name: "Hall", tempValue: "20", humiValue: 67, lightValue: 50, radiatorState: 4, isWindowOpen: true, lightLevel: 2 }]);
    useTemperatureMock = require('../../hooks/conditions/useTemperatureHistory.js').useTemperatureHistory;
    useTemperatureMock.mockReturnValue([{ date: new Date(), value: 25 }])
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
    expect(screen.getByText('23°C')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('35%')).toBeInTheDocument()
    fireEvent.click(rooms[1])
    expect(screen.getByTestId('room-name-header')).toContainHTML("Hall")
    expect(screen.getByText('20°C')).toBeInTheDocument()
    expect(screen.getByText('67%')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('temperature data is fetched and displayed', async () => {
    render(<MyHome />)
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
    useTemperatureMock.mockReturnValue([
      { date: new Date(), value: -1 },
      { date: addDays(new Date(), 1), value: -5 },
      { date: addDays(new Date(), 2), value: 5 },
    ]);
    render(<MyHome />);
    expect(await screen.findByText('-1°C')).toBeInTheDocument()
    expect(await screen.findByText('-5°C')).toBeInTheDocument()
    expect(await screen.findByText('5°C')).toBeInTheDocument()
  })
})
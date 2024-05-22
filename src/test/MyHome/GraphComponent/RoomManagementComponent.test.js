import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RoomManagementComponent from '../../../components/MyHome/GraphComponent/RoomManagementComponent';
import { Chart } from 'chart.js';
import 'jest-canvas-mock';
import { useTemperatureHistory } from '../../../hooks/conditions/useTemperatureHistory';
import { useHumidityHistory } from '../../../hooks/conditions/useHumidityHistory.js';
import { useLightLevelHistory } from '../../../hooks/conditions/useLightLevelHistory.js';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

jest.mock('../../../hooks/conditions/useTemperatureHistory.js', () => ({
  useTemperatureHistory: jest.fn()
}))

jest.mock('../../../hooks/conditions/useHumidityHistory.js', () => ({
  useHumidityHistory: jest.fn()
}))

jest.mock('../../../hooks/conditions/useLightLevelHistory.js', () => ({
  useLightLevelHistory: jest.fn()
}))

describe('RoomManagementComponent', () => {
  const setDataMock = jest.fn();
  const setIntervalMock = jest.fn();
  const setSelectedValueMock = jest.fn();
  const setRoomMock = jest.fn();

  let useTemperatureHistoryMock, useHumidityHistoryMock, useLightLevelHistoryMock

  const data = {
    labels: ['01/01/2024', '01/02/2024'],
    datasets: [{
      label: 'Temperature',
      data: [25, 26]
    }]
  };
  
  const roomData = { id: 1, deviceId: 1, name: "Living Room", tempValue: "23", humiValue: 35, lightValue: 100, radiatorState: 1, isWindowOpen: true, lightLevel: 4 };

  const interval = {
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-05-20'),
  };

  beforeEach(() => {
    useTemperatureHistoryMock = require('../../../hooks/conditions/useTemperatureHistory.js').useTemperatureHistory
    useTemperatureHistoryMock.mockReturnValue({
      labels: ['01/01/2024', '01/02/2024'],
      datasets: [{
        label: 'Temperature',
        data: [25, 26]
      }]
    })

    useHumidityHistoryMock = require('../../../hooks/conditions/useHumidityHistory.js').useHumidityHistory
    useHumidityHistoryMock.mockReturnValue({
      labels: ['01/01/2024', '01/02/2024'],
      datasets: [{
        label: 'Humidity',
        data: [50, 55]
      }]
    })

    useLightLevelHistoryMock = require('../../../hooks/conditions/useLightLevelHistory.js').useLightLevelHistory
    useLightLevelHistoryMock.mockReturnValue({
      labels: ['01/01/2024', '01/02/2024'],
      datasets: [{
        label: 'Light Level',
        data: [75, 80]
      }]
    })
  })

  it('renders RoomManagementComponent with provided data', async () => {
    render(<RoomManagementComponent
      data={data}
      setData={setDataMock}
      interval={{ startDate: new Date(), endDate: new Date() }}
      setInterval={setIntervalMock}
      selectedValue="Temperature"
      setSelectedValue={setSelectedValueMock}
      room={roomData} />);

    expect(screen.getByText('Living Room')).toBeInTheDocument();

    expect(screen.getByText('23°C')).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();

    expect(screen.getByTestId('graph')).toBeInTheDocument();
    expect(screen.getByTestId('date-interval-picker')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-list')).toBeInTheDocument();
    expect(screen.getByTestId('room-controller')).toBeInTheDocument();

    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Light Level')).toBeInTheDocument();
  });

  test('changes selected value on dropdown change', () => {
    const {rerender } = render(
      <RoomManagementComponent
        data={data}
        setData={setDataMock}
        interval={interval}
        setInterval={setIntervalMock}
        selectedValue="Temperature"
        setSelectedValue={setSelectedValueMock}
        room={roomData}
        setRoom={setRoomMock}
      />
    );

    /*expect(setDataMock).toHaveBeenCalledTimes(1)
    const returnValue = setDataMock.mock.calls[0][0]()
    console.log(returnValue)
    console.log(data)
    expect(returnValue).toBe(data)*/

    const dropdown = screen.getByTestId('dropdown-list');
    fireEvent.change(dropdown, { target: { value: 'Humidity' } });
    expect(setSelectedValueMock).toHaveBeenCalledWith('Humidity');

    rerender(
      <RoomManagementComponent
        data={data}
        setData={setDataMock}
        interval={interval}
        setInterval={setIntervalMock}
        selectedValue="Humidity"
        setSelectedValue={setSelectedValueMock}
        room={roomData}
        setRoom={setRoomMock}
      />
    );

    fireEvent.change(dropdown, { target: { value: 'Light Level' } });
    expect(setSelectedValueMock).toHaveBeenNthCalledWith(2, 'Light Level');
  });
});

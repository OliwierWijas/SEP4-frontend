import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RoomManagementComponent from '../../../components/MyHome/GraphComponent/RoomManagementComponent';
import { Chart } from 'chart.js';
import 'jest-canvas-mock';
import { useTemperatureHistory } from '../../../hooks/conditions/useTemperatureHistory';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

const mockTemperatureData = [{ date: '2024-01-01', value: 25 }, { date: '2024-01-02', value: 26 }];
const mockHumidityData = [{ date: '2024-01-01', value: 50 }, { date: '2024-01-02', value: 55 }];
const mockLightData = [{ date: '2024-01-01', value: 75 }, { date: '2024-01-02', value: 80 }];

jest.mock('../../../hooks/conditions/useTemperatureHistory.js', () => ({
  useTemperatureHistory: jest.fn(() => mockTemperatureData)
}))

jest.mock('../../../hooks/conditions/useHumidityHistory.js', () => ({
  useHumidityHistory: jest.fn(() => mockHumidityData)
}))

jest.mock('../../../hooks/conditions/useLightLevelHistory.js', () => ({
  useLightLevelHistory: jest.fn(() => mockLightData)
}))

describe('RoomManagementComponent', () => {
  const roomData = { id: 1, deviceId: 1, name: "Living Room", latestTemperature: "23", latestHumidity: 35, latestLightLevel: 100, radiatorState: 1, isWindowOpen: true, lightLevel: 4 };

  const data = {
    labels: ['01/01/2024', '01/02/2024'],
    datasets: [{
      label: 'Temperature',
      data: [25, 26]
    }]
  };

  const interval = {
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-05-20'),
  };

  const setDataMock = jest.fn();
  const setIntervalMock = jest.fn();
  const setSelectedValueMock = jest.fn();
  const setRoomMock = jest.fn();

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

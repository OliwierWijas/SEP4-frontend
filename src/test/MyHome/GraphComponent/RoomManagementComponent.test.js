import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RoomManagementComponent from '../../../components/MyHome/GraphComponent/RoomManagementComponent';
import { Chart } from 'chart.js';
import 'jest-canvas-mock';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

describe('RoomManagementComponent', () => {
  const roomData = {
    id: 1,
    name: 'Living Room',
    temperature: 25,
    humidity: 50,
    lightLevel: 75
  };

  const data = {
    labels: ['01/01/2024', '01/02/2024'],
    datasets: [{
      label: 'Temperature',
      data: [25, 26]
    }]
  };

  const mockTemperatureData = [{ date: '2024-01-01', value: 25 }, { date: '2024-01-02', value: 26 }];
  const mockHumidityData = [{ date: '2024-01-01', value: 50 }, { date: '2024-01-02', value: 55 }];
  const mockLightData = [{ date: '2024-01-01', value: 75 }, { date: '2024-01-02', value: 80 }];

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockTemperatureData
    }).mockResolvedValueOnce({
      json: async () => mockHumidityData
    }).mockResolvedValueOnce({
      json: async () => mockLightData
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const setDataMock = jest.fn();
  const setIntervalMock = jest.fn();
  const setSelectedValueMock = jest.fn();

  it('renders RoomManagementComponent with provided data', async () => {
    render(<RoomManagementComponent 
      data={data} 
      setData={setDataMock} 
      interval={[{ startDate: new Date(), endDate: new Date() }]} 
      setInterval={setIntervalMock} 
      selectedValue="Temperature" 
      setSelectedValue={setSelectedValueMock} 
      room={roomData} />);
    
    expect(screen.getByText('Living Room')).toBeInTheDocument();

    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();

    expect(screen.getByTestId('graph')).toBeInTheDocument();
    expect(screen.getByTestId('date-interval-picker')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-list')).toBeInTheDocument();
    expect(screen.getByTestId('room-controller')).toBeInTheDocument();

    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Light Level')).toBeInTheDocument();
  });

  it('updates data correctly when selectedValue changes', () => {
    const { rerender } = render(
      <RoomManagementComponent
        data={data}
        setData={setDataMock}
        interval={[{ startDate: new Date(), endDate: new Date() }]}
        setInterval={setIntervalMock}
        selectedValue="Temperature"
        setSelectedValue={setSelectedValueMock}
        room={roomData}
      />
    );

    const selectInput = screen.getByTestId('dropdown-list');
    fireEvent.change(selectInput, { target: { value: 'Humidity' } });

    rerender(
      <RoomManagementComponent
        data={data}
        setData={setDataMock}
        interval={[{ startDate: new Date(), endDate: new Date() }]}
        setInterval={setIntervalMock}
        selectedValue="Humidity"
        setSelectedValue={setSelectedValueMock}
        room={roomData}
      />
    );

    expect(setSelectedValueMock).toHaveBeenCalledWith('Humidity');
    expect(setDataMock).toHaveBeenCalledTimes(2)

    fireEvent.change(selectInput, { target: { value: 'Light Level' } });
    rerender(
      <RoomManagementComponent
        data={data}
        setData={setDataMock}
        interval={[{ startDate: new Date(), endDate: new Date() }]}
        setInterval={setIntervalMock}
        selectedValue="Light Level"
        setSelectedValue={setSelectedValueMock}
        room={roomData}
      />
    );

    expect(setSelectedValueMock).toHaveBeenNthCalledWith(2, 'Light Level');
    expect(setDataMock).toHaveBeenCalledTimes(3);
  });
});

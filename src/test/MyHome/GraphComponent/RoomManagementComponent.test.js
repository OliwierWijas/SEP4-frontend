import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RoomManagementComponent from '../../../components/MyHome/GraphComponent/RoomManagementComponent';
import { Chart } from 'chart.js';
import 'jest-canvas-mock';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

describe('RoomManagementComponent', () => {
  const mockData = {
    labels: ['01/01/2024', '01/02/2024', '01/03/2024'],
    datasets: [{
      label: 'Temperature',
      data: [20, 22, 21],
    }],
  };

  const mockData1 = {
    labels: ['01/02/2024', '01/03/2024', '01/04/2024'],
    datasets: [{
      label: 'LightLevel',
      data: [25, 40, 34],
    }],
  };

  it('renders RoomManagementComponent correctly', () => {
    render(
      <RoomManagementComponent
        data={mockData}
        setData={() => {}}
        interval={[{ startDate: new Date(), endDate: new Date() }]}
        setInterval={() => {}}
        selectedValue="Temperature"
        setSelectedValue={() => {}}
      />
    );

    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Light Level')).toBeInTheDocument();
  });

  it('updates data correctly when selectedValue changes', () => {
    const setDataMock = jest.fn();
    const setSelectedValueMock = jest.fn();

    const { rerender } = render(
      <RoomManagementComponent
        data={mockData1}
        setData={setDataMock}
        interval={[{ startDate: new Date(), endDate: new Date() }]}
        setInterval={() => {}}
        selectedValue="Temperature"
        setSelectedValue={setSelectedValueMock}
        room={{ id: 1, name: "Living Room", temperature: "23", humidity: 35, lightLevel: "100" }}
      />
    );

    const selectInput = screen.getByTestId('dropdown-list');

    fireEvent.change(selectInput, { target: { value: 'Humidity' } });
    rerender(
      <RoomManagementComponent
        data={mockData}
        setData={setDataMock}
        interval={[{ startDate: new Date(), endDate: new Date() }]}
        setInterval={() => {}}
        selectedValue="Humidity"
        setSelectedValue={setSelectedValueMock}
        room={{ id: 1, name: "Living Room", temperature: "23", humidity: 35, lightLevel: "100" }}
      />
    );

    expect(setSelectedValueMock).toHaveBeenCalledWith('Humidity');
    expect(setDataMock).toHaveBeenCalledTimes(2)

    fireEvent.change(selectInput, { target: { value: 'Light Level' } });
    rerender(
      <RoomManagementComponent
        data={mockData1}
        setData={setDataMock}
        interval={[{ startDate: new Date(), endDate: new Date() }]}
        setInterval={() => {}}
        selectedValue="Light Level"
        setSelectedValue={setSelectedValueMock}
        room={{ id: 1, name: "Living Room", temperature: "23", humidity: 35, lightLevel: "100" }}
      />
    );

    expect(setSelectedValueMock).toHaveBeenNthCalledWith(2, 'Light Level');
    expect(setDataMock).toHaveBeenCalledTimes(3);
  });
});

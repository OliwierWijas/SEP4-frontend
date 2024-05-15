import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RoomController from '../../../components/MyHome/GraphComponent/RoomController.js';

describe('RoomController component', () => {
  it('renders the component with initial values', () => {
    render(
      <RoomController
        radiatorStatus={3}
        setRadiatorStatus={() => {}}
        windowsStatus={false}
        setWindowsStatus={() => {}}
        lightStatus={2}
        setLightStatus={() => {}}
      />
    );

    expect(screen.getByTestId('room-controller')).toBeInTheDocument();
    expect(screen.getByText('Radiator')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
    expect(screen.getByText('Light level')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('increments and decrements radiator status correctly', () => {
    let radiatorStatus = 3;
    const setRadiatorStatus = jest.fn(status => {
      radiatorStatus = status(radiatorStatus);
    });
    
    render(
      <RoomController
        radiatorStatus={radiatorStatus}
        setRadiatorStatus={setRadiatorStatus}
        windowsStatus={false}
        setWindowsStatus={() => {}}
        lightStatus={2}
        setLightStatus={() => {}}
      />
    );

    fireEvent.click(screen.getByTestId('radiator-up'));
    expect(radiatorStatus).toBe(4);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(3);
  });

  it('increments and decrements light status correctly', () => {
    let lightStatus = 2;
    const setLightStatus = jest.fn(status => {
      lightStatus = status(lightStatus);
    });

    render(
      <RoomController
        radiatorStatus={3}
        setRadiatorStatus={() => {}}
        windowsStatus={false}
        setWindowsStatus={() => {}}
        lightStatus={lightStatus}
        setLightStatus={setLightStatus}
      />
    );

    fireEvent.click(screen.getByTestId('lights-up'));
    expect(lightStatus).toBe(3);

    fireEvent.click(screen.getByTestId('lights-down'));
    expect(lightStatus).toBe(2);
  });

});

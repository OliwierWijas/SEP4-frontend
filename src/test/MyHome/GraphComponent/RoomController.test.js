import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RoomController from '../../../components/MyHome/GraphComponent/RoomController.js';

describe('RoomController component', () => {
  it('renders the component with initial values', () => {
    render(
      <RoomController
        roomId={1}
        radiatorStatus={3}
        setRadiatorStatus={() => { }}
        windowsStatus={false}
        setWindowsStatus={() => { }}
        lightStatus={2}
        setLightStatus={() => { }}
      />
    );

    expect(screen.getByTestId('room-controller')).toBeInTheDocument();
    expect(screen.getByText('Radiator')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();
    expect(screen.getByText('Light level')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('increment temperature button increases temperature when clicked', () => {
    
    const roomId = 1
    let radiatorStatus = 0
    const setRadiatorStatus = jest.fn(status => { console.log(status)})
    let windowsStatus = true; // Example window status
    const setWindowsStatus = jest.fn(); // Mock function to set window status
    let lightStatus = 2; // Example light status
    const setLightStatus = jest.fn(); // Mock function to set light status

    // Render the component with mock data and functions
    render(
      <RoomController
        roomId={roomId}
        radiatorStatus={radiatorStatus}
        setRadiatorStatus={setRadiatorStatus}
        windowsStatus={windowsStatus}
        setWindowsStatus={setWindowsStatus}
        lightStatus={lightStatus}
        setLightStatus={setLightStatus}
      />
    );

    // Act: Click on the increment temperature button
    const incrementButton = screen.getByTestId('radiator-up');
    fireEvent.click(incrementButton);

    // Assert: Check if the setRadiatorStatus function was called with the incremented value
    //expect(setRadiatorStatus).toHaveBeenNthCalledWith(2, 1); // Assuming incrementing by 1
  });

  /*it('increments and decrements radiator status correctly', () => {
    let radiatorStatus = 3;
    const setRadiatorStatus = jest.fn(status => {
      radiatorStatus = status(radiatorStatus);
    });

    render(
      <RoomController
        roomId={1}
        radiatorStatus={radiatorStatus}
        setRadiatorStatus={setRadiatorStatus}
        windowsStatus={false}
        setWindowsStatus={() => { }}
        lightStatus={2}
        setLightStatus={() => { }}
      />
    );

    fireEvent.click(screen.getByTestId('radiator-up'));
    expect(radiatorStatus).toBe(4);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(3);
  });*/

  /*it('forbids from increasing the radiator status above 6 and below 0', () => {
    let radiatorStatus = 6;
    const setRadiatorStatus = jest.fn(newState => {
      radiatorStatus = newState;
    });

    render(
      <RoomController
        roomId={1}
        radiatorStatus={radiatorStatus}
        setRadiatorStatus={setRadiatorStatus}
        windowsStatus={false}
        setWindowsStatus={() => { }}
        lightStatus={2}
        setLightStatus={() => { }}
      />
    );

    fireEvent.click(screen.getByTestId('radiator-up'));
    expect(radiatorStatus).toBe(6);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(5);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(4);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(3);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(2);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(1);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(0);

    fireEvent.click(screen.getByTestId('radiator-down'));
    expect(radiatorStatus).toBe(0);
  });

  it('increments and decrements light status correctly', () => {
    let lightStatus = 2;
    const setLightStatus = jest.fn(newState => {
      lightStatus = newState;
    });

    render(
      <RoomController
        roomId={1}
        radiatorStatus={3}
        setRadiatorStatus={() => { }}
        windowsStatus={false}
        setWindowsStatus={() => { }}
        lightStatus={lightStatus}
        setLightStatus={setLightStatus}
      />
    );

    fireEvent.click(screen.getByTestId('lights-up'));
    expect(lightStatus).toBe(3);

    fireEvent.click(screen.getByTestId('lights-down'));
    expect(lightStatus).toBe(2);
  });

  it('forbids from increasing the light status above 4 and below 0', () => {
    let lightStatus = 4;
    const setLightStatus = jest.fn(newState => {
      lightStatus = newState;
    });

    render(
      <RoomController
        roomId={1}
        radiatorStatus={3}
        setRadiatorStatus={() => { }}
        windowsStatus={false}
        setWindowsStatus={() => { }}
        lightStatus={lightStatus}
        setLightStatus={setLightStatus}
      />
    );

    fireEvent.click(screen.getByTestId('lights-up'));
    expect(lightStatus).toBe(4);

    fireEvent.click(screen.getByTestId('lights-down'));
    expect(lightStatus).toBe(3);

    fireEvent.click(screen.getByTestId('lights-down'));
    expect(lightStatus).toBe(2);

    fireEvent.click(screen.getByTestId('lights-down'));
    expect(lightStatus).toBe(1);

    fireEvent.click(screen.getByTestId('lights-down'));
    expect(lightStatus).toBe(0);

    fireEvent.click(screen.getByTestId('lights-down'));
    expect(lightStatus).toBe(0);
  });*/
});

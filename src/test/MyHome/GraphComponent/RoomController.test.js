import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RoomController from '../../../components/MyHome/GraphComponent/RoomController.js';

jest.mock('../../../hooks/room/useSetRadiator.js', () => ({
  useSetRadiator: jest.fn(() => jest.fn()),
}));

jest.mock('../../../hooks/room/useSetWindow.js', () => ({
  useSwitchWindow: jest.fn(() => jest.fn()),
}));

jest.mock('../../../hooks/room/useSetLightLevel.js', () => ({
  useSetLightLevel: jest.fn(() => jest.fn()),
}));

describe('RoomController', () => {
    let setRoom;
    let room;
    let mockSetRadiator, mockSetWindow, mockSetLight;

    beforeEach(() => {
      room = { radiatorState: 2, isWindowOpen: false, lightLevel: 2 };
      setRoom = jest.fn((update) => {
          if (typeof update === 'function') {
              room = { ...room, ...update(room) };
          } else {
              room = { ...room, ...update };
          }
      });
  
      mockSetRadiator = require('../../../hooks/room/useSetRadiator.js').useSetRadiator;
      mockSetWindow = require('../../../hooks/room/useSetWindow.js').useSwitchWindow;
      mockSetLight = require('../../../hooks/room/useSetLightLevel.js').useSetLightLevel;
  
      mockSetRadiator.mockReturnValue(jest.fn());
      mockSetWindow.mockReturnValue(jest.fn());
      mockSetLight.mockReturnValue(jest.fn());
  });

    it('increments radiator status', () => {
        render(<RoomController room={room} setRoom={setRoom} />);

        fireEvent.click(screen.getByTestId('radiator-up'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.radiatorState).toBe(3);
        expect(mockSetRadiator()).toHaveBeenCalledWith(room);
    });

    it('decrements radiator status', () => {
        render(<RoomController room={room} setRoom={setRoom} />);

        fireEvent.click(screen.getByTestId('radiator-down'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.radiatorState).toBe(1);
        expect(mockSetRadiator()).toHaveBeenCalledWith(room);
    });

    it('increments light level', () => {
        render(<RoomController room={room} setRoom={setRoom} />);

        fireEvent.click(screen.getByTestId('lights-up'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.lightLevel).toBe(3);
        expect(mockSetLight()).toHaveBeenCalledWith(room);
    });

    it('decrements light level', () => {
        render(<RoomController room={room} setRoom={setRoom} />);

        fireEvent.click(screen.getByTestId('lights-down'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.lightLevel).toBe(1);
        expect(mockSetLight()).toHaveBeenCalledWith(room);
    });

    it('toggles window status', () => {
        render(<RoomController room={room} setRoom={setRoom} />);

        fireEvent.click(screen.getByTestId('toggleId'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.isWindowOpen).toBe(true);
        expect(mockSetWindow()).toHaveBeenCalledWith(room);
    });
});

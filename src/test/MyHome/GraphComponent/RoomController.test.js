import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RoomController from '../../../components/MyHome/GraphComponent/RoomControllerComponent.js';
import { AuthContext } from '../../../auth/AuthContext.js';

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

    const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
        return render(
            <AuthContext.Provider value={providerProps}>
                {ui}
            </AuthContext.Provider>,
            renderOptions
        );
    };

    it('increments radiator status', () => {
        const providerProps = { claims: { token: 'mock-token' } };
        renderWithAuthContext(<RoomController room={room} setRoom={setRoom} />, { providerProps });

        fireEvent.click(screen.getByTestId('radiator-up'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.radiatorState).toBe(3);
        expect(mockSetRadiator()).toHaveBeenCalledWith(room, "mock-token");
    });

    it('decrements radiator status', () => {
        const providerProps = { claims: { token: 'mock-token' } };
        renderWithAuthContext(<RoomController room={room} setRoom={setRoom} />, { providerProps });

        fireEvent.click(screen.getByTestId('radiator-down'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.radiatorState).toBe(1);
        expect(mockSetRadiator()).toHaveBeenCalledWith(room, "mock-token");
    });

    it('increments light level', () => {
        const providerProps = { claims: { token: 'mock-token' } };
        renderWithAuthContext(<RoomController room={room} setRoom={setRoom} />, { providerProps });

        fireEvent.click(screen.getByTestId('lights-up'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.lightLevel).toBe(3);
        expect(mockSetLight()).toHaveBeenCalledWith(room, "mock-token");
    });

    it('decrements light level', () => {
        const providerProps = { claims: { token: 'mock-token' } };
        renderWithAuthContext(<RoomController room={room} setRoom={setRoom} />, { providerProps });

        fireEvent.click(screen.getByTestId('lights-down'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.lightLevel).toBe(1);
        expect(mockSetLight()).toHaveBeenCalledWith(room, "mock-token");
    });

    it('toggles window status', () => {
        const providerProps = { claims: { token: 'mock-token' } };
        renderWithAuthContext(<RoomController room={room} setRoom={setRoom} />, { providerProps });

        fireEvent.click(screen.getByTestId('toggleId'));
        expect(setRoom).toHaveBeenCalled();
        expect(room.isWindowOpen).toBe(true);
        expect(mockSetWindow()).toHaveBeenCalledWith(room, "mock-token");
    });
});

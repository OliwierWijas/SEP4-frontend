import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Toggle from '../../../components/MyHome/GraphComponent/Toggle.js'

describe('Toggle component', () => {
    it('renders the toggle switch correctly', () => {
        render(
            <Toggle status={false} setStatus={() => { }} />
        )

        const toggleSwitch = screen.getByTestId('toggleId')
        expect(toggleSwitch).toBeInTheDocument()
        expect(toggleSwitch).not.toBeChecked()
    });

    it('changes the status when clicked', () => {
        let status = false
        const setStatus = jest.fn(newStatus => {
            status = newStatus;
        });

        render(
            <Toggle status={status} setStatus={setStatus} />
        );

        const toggleSwitch = screen.getByTestId('toggleId');
        fireEvent.click(toggleSwitch)

        expect(status).toBe(true)
        expect(setStatus).toHaveBeenCalled()
    });

    it('changes the appearance when clicked', async () => {
        let status = false
        const setStatus = jest.fn(newStatus => {
            status = newStatus;
        });

        render(
            <Toggle status={status} setStatus={setStatus} />
        )

        let toggleLabel = screen.getByText('O')
        expect(toggleLabel).toBeInTheDocument()

        const toggleSwitch = screen.getByTestId('toggleId')
        fireEvent.click(toggleSwitch)

        expect(status).toBeTruthy()
        expect(setStatus).toHaveBeenCalled()

        toggleLabel = await screen.findByText('C')
        expect(toggleLabel).toBeInTheDocument()
    });
});

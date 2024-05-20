import React from 'react'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import DateIntervalPicker from "../../../components/MyHome/GraphComponent/DateIntervalPicker"

jest.mock('react-date-range', () => ({
    DateRangePicker: ({ onChange, showSelectionPreview, moveRangeOnFirstSelection, months, ranges, direction }) => (
        <div data-testid="mock-date-range-picker">
            <input
                data-testid="start-date" // Add data-testid for start date input
                onChange={(e) => onChange({ selection: { startDate: new Date(e.target.value) } })} // Convert string to Date object
            />
            <input
                data-testid="end-date" // Add data-testid for end date input
                onChange={(e) => onChange({ selection: { endDate: new Date(e.target.value) } })} // Convert string to Date object
            />
        </div>
    ),
}));


describe('DateIntervalPicker component', () => {
    const mockInterval = [{ startDate: new Date('2024-01-01'), endDate: new Date('2024-01-07') }];

    it('renders DateIntervalPicker correctly', () => {
        render(<DateIntervalPicker interval={mockInterval} setInterval={() => { }} />);
        const dateRangePicker = screen.getByTestId('mock-date-range-picker');
        expect(dateRangePicker).toBeInTheDocument();
    });

    it('handles date change correctly', async () => {
        const setIntervalMock = jest.fn();
        render(<DateIntervalPicker interval={mockInterval} setInterval={setIntervalMock} />);

        await waitFor(() => {
            const startDateInput = screen.getByTestId('start-date');
            const endDateInput = screen.getByTestId('end-date');

            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            fireEvent.change(endDateInput, { target: { value: '2024-04-15' } });
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            fireEvent.change(startDateInput, { target: { value: '2024-04-10' } });
        });

        expect(setIntervalMock).toHaveBeenCalledTimes(2)
        expect(setIntervalMock).toHaveBeenNthCalledWith(1, {"endDate": new Date('2024-04-15T00:00:00.000Z')})
        expect(setIntervalMock).toHaveBeenNthCalledWith(2, {"startDate": new Date('2024-04-10T00:00:00.000Z')})
    })
})
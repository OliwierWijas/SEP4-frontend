import React from 'react'
import { render, screen } from '@testing-library/react'
import NotificationBoxComponent from '../../components/MyProfile/NotificationBoxComponent'
import { useNotifications } from '../../hooks/home/useNotifications'

jest.mock('../../hooks/home/useNotifications', () => ({
    useNotifications: jest.fn()
}))

describe('NotificationBoxComponent', () => {
    let useNotificationsMock

    beforeEach(() => {
        useNotificationsMock = require('../../hooks/home/useNotifications').useNotifications
        useNotificationsMock.mockReturnValue([
            { dateString: "2024-05-11T10:57:00.000Z", text: "Temperature at home is rising, consider adjusting the thermostat." },
            { dateString: "2024-05-12T08:30:00.000Z", text: "Humidity levels are high, open a window to let in some fresh air." }
        ])
    })

    it('renders the title and notifications correctly', () => {
        render(<NotificationBoxComponent />);

        const notificationBox = screen.getByTestId('notification-box')
        expect(notificationBox).toBeInTheDocument()

        const titleElement = screen.getByText('HOME UPDATES')
        expect(titleElement).toBeInTheDocument()

        const date1 = screen.getByText('May 11, 2024, 10:57 AM')
        const date2 = screen.getByText('May 12, 2024, 08:30 AM')
        expect(date1).toBeInTheDocument()
        expect(date2).toBeInTheDocument()

        const notification1 = screen.getByText('Temperature at home is rising, consider adjusting the thermostat.')
        const notification2 = screen.getByText('Humidity levels are high, open a window to let in some fresh air.')
        expect(notification1).toBeInTheDocument()
        expect(notification2).toBeInTheDocument()
    });
});

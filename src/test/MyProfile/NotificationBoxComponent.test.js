import React from 'react'
import { render, screen } from '@testing-library/react'
import NotificationBoxComponent from '../../components/MyProfile/NotificationBoxComponent'
import { useNotifications } from '../../hooks/home/useNotifications.js'
import { AuthContext } from '../../auth/AuthContext.js'

jest.mock('../../hooks/home/useNotifications.js', () => ({
    useNotifications: jest.fn()
}))

describe('NotificationBoxComponent', () => {
    const providerProps = { claims: { token: 'mock-token', role: "Member", houseId: 1 } }

    const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
      return render(
        <AuthContext.Provider value={providerProps}>
          {ui}
        </AuthContext.Provider>,
        renderOptions
      )
    }

    let useNotificationsMock

    beforeEach(() => {
        useNotificationsMock = require('../../hooks/home/useNotifications.js').useNotifications
        useNotificationsMock.mockReturnValue([
            { sendAt: "2024-05-11T10:57:00.000Z", message: "Temperature at home is rising, consider adjusting the thermostat." },
            { sendAt: "2024-05-12T08:30:00.000Z", message: "Humidity levels are high, open a window to let in some fresh air." }
        ])
    })

    it('renders the title and notifications correctly', () => {
        renderWithAuthContext(<NotificationBoxComponent />, { providerProps });

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

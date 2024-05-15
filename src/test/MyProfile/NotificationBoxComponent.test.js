import React from 'react'
import { render, screen } from '@testing-library/react'
import NotificationBoxComponent from '../../components/MyProfile/NotificationBoxComponent'


describe('NotificationBoxComponent', () => {
    it('renders the title and notifications correctly', () => {
        render(<NotificationBoxComponent />);

        const notificationBox = screen.getByTestId('notification-box')
        expect(notificationBox).toBeInTheDocument()

        const titleElement = screen.getByText('HOME UPDATES')
        expect(titleElement).toBeInTheDocument()

        const date1 = screen.getAllByText('May 11, 2024, 10:57 AM')[0]
        const date2 = screen.getAllByText('May 12, 2024, 08:30 AM')[0]
        expect(date1).toBeInTheDocument()
        expect(date2).toBeInTheDocument()
        
        const notification1 = screen.getAllByText('Temperature at home is rising, consider adjusting the thermostat.')[0]
        const notification2 = screen.getAllByText('Humidity levels are high, open a window to let in some fresh air.')[0]
        expect(notification1).toBeInTheDocument()
        expect(notification2).toBeInTheDocument()
    });
});

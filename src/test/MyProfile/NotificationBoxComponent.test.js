import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationBoxComponent from '../../components/MyProfile/NotificationBoxComponent';


describe('NotificationBoxComponent', () => {
    localStorage.setItem("houseId", 1)

    it('renders the title and notifications correctly', () => {
        render(<NotificationBoxComponent />);

        const titleElement = screen.getByText('HOME UPDATES');
        expect(titleElement).toBeInTheDocument();

        const notification1 = screen.getByText('Notification 1');
        const notification2 = screen.getByText('Notification 2');
        expect(notification1).toBeInTheDocument();
        expect(notification2).toBeInTheDocument();

        const notificationBox = screen.getByTestId('notification-box');
        expect(notificationBox).toHaveClass('scrollbar');
    });
});

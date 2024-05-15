import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationComponent from '../../components/MyProfile/NotificationComponent.js';

describe('NotificationComponent', () => {
  it('renders notifications correctly', () => {
    const notificationArray = [
      { 
        dateString: '2024-05-15T08:30:00Z', // Sample date string
        text: 'Notification 1' 
      },
      { 
        dateString: '2024-05-16T10:45:00Z', // Sample date string
        text: 'Notification 2' 
      },
    ];

    render(<NotificationComponent notificationArray={notificationArray} />);

    const notification1 = screen.getByText('Notification 1');
    const notification2 = screen.getByText('Notification 2');

    expect(notification1).toBeInTheDocument();
    expect(notification2).toBeInTheDocument();

    const formattedDate1 = screen.getByText("May 15, 2024, 08:30 AM");
    const formattedDate2 = screen.getByText("May 16, 2024, 10:45 AM");

    expect(formattedDate1).toBeInTheDocument();
    expect(formattedDate2).toBeInTheDocument();

    expect(screen.getAllByTestId('notification-item')).toHaveLength(2);
  });
});

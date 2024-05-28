import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationComponent from '../../components/MyProfile/NotificationComponent.js';
import { AuthContext } from '../../auth/AuthContext.js';

describe('NotificationComponent', () => {
  const providerProps = { claims: { token: 'mock-token', role: "Member", houseId: 1 } }

  const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <AuthContext.Provider value={providerProps}>
        {ui}
      </AuthContext.Provider>,
      renderOptions
    )
  }

  it('renders notifications correctly', () => {
    const notificationArray = [
      { 
        sendAt: '2024-05-15T08:30:00Z',
        message: 'Notification 1' 
      },
      { 
        sendAt: '2024-05-16T10:45:00Z',
        message: 'Notification 2' 
      },
    ];

    renderWithAuthContext(<NotificationComponent notificationArray={notificationArray} />, { providerProps });

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

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LockerPopUp from '../components/LockerPopUp.js';
import { AuthContext } from '../auth/AuthContext.js';

describe('LockerPopUp', () => {
  const providerProps = { claims: { token: 'mock-token', role: "Admin" } }

  const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <AuthContext.Provider value={providerProps}>
        {ui}
      </AuthContext.Provider>,
      renderOptions
    )
  }

  test('renders correctly', () => {
    renderWithAuthContext(<LockerPopUp />, { providerProps });
    const titleElement = screen.getByText('HOME LOCKER');
    const passwordInput = screen.getByPlaceholderText('Enter password...');

    expect(titleElement).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    renderWithAuthContext(<LockerPopUp />, { providerProps });
    const visibilityButton = screen.getByTestId('visibility-button');
    const passwordInput = screen.getByTestId('password-input');
  
    expect(passwordInput.type).toBe('password');
  
    fireEvent.click(visibilityButton);
  
    expect(passwordInput.type).toBe('text');
  
    fireEvent.click(visibilityButton);
  
    expect(passwordInput.type).toBe('password');
  });
  
  test('changes button text and clears password field on button click', () => {
    renderWithAuthContext(<LockerPopUp />, { providerProps });
    const button = screen.getByText('Lock');
    const passwordInput = screen.getByTestId('password-input');
  
    fireEvent.click(button);
  
    expect(button).toHaveTextContent('Lock');
    expect(passwordInput.value).toBe(''); 
  });
});

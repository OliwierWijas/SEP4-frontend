import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LockerPopUp from '../components/LockerPopUp.js';

describe('LockerPopUp', () => {
  test('renders correctly', () => {
    render(<LockerPopUp />);
    const titleElement = screen.getByText('HOME LOCKER');
    const passwordInput = screen.getByPlaceholderText('Enter password...');

    expect(titleElement).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    render(<LockerPopUp />);
    const visibilityButton = screen.getByTestId('visibility-button');
    const passwordInput = screen.getByTestId('password-input');
  
    expect(passwordInput.type).toBe('password');
  
    fireEvent.click(visibilityButton);
  
    expect(passwordInput.type).toBe('text');
  
    fireEvent.click(visibilityButton);
  
    expect(passwordInput.type).toBe('password');
  });

  /*test('triggers onChange event for password input', () => {
    render(<LockerPopUp />);
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });*/
  

  
  test('changes button text and clears password field on button click', () => {
    render(<LockerPopUp />);
    const button = screen.getByText('Lock');
    const passwordInput = screen.getByTestId('password-input');
  
    fireEvent.click(button);
  
    expect(button).toHaveTextContent('Unlock');
  
    const newButtonText = button.textContent;
    expect(newButtonText).toBe('Unlock'); 
    expect(passwordInput.value).toBe(''); 
  });
  
});

import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import FormComponent from '../../components/SignUp/FormComponent.js'

describe('FormComponent', () => {
  it('renders username input field when usernameNeeded prop is true', () => {
    render(<FormComponent usernameNeeded={true} />)
    const usernameInput = screen.getByPlaceholderText('username')
    expect(usernameInput).toBeInTheDocument()
  })

  it('does not renders password input field when passwordNeeded prop is true', () => {
    render(<FormComponent passwordNeeded={true} />)
    const passwordInput = screen.getByPlaceholderText('password')
    expect(passwordInput).toBeInTheDocument()
  })

  it('calls action function with input values when submit button is clicked', () => {
    const mockAction = jest.fn()
    render(
      <FormComponent
        usernameNeeded={true}
        passwordNeeded={true}
        repeatPasswordNeeded={true}
        action={mockAction}
        buttonText="Submit"
      />
    )

    const usernameInput = screen.getByPlaceholderText('username')
    const passwordInput = screen.getByPlaceholderText('password')
    const repeatPasswordInput = screen.getByPlaceholderText('repeat password')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(usernameInput, { target: { value: 'testUsername' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(repeatPasswordInput, { target: { value: 'password123' } })

    fireEvent.click(submitButton)

    expect(mockAction).toHaveBeenCalledWith('testUsername', 'password123')
  })

  it('throws an alert when username was not entered', () => {
    const mockAction = jest.fn();
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });

    render(
      <FormComponent
        usernameNeeded={true}
        buttonText="Submit"
        action={mockAction}
      />
    );

    const usernameInput = screen.getByPlaceholderText('username')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(usernameInput, { target: { value: '' } })

    fireEvent.click(submitButton)

    expect(mockAlert).toHaveBeenCalledWith('Please fill in all required fields.')
    expect(mockAction).not.toHaveBeenCalled()

    mockAlert.mockRestore()
  })

  it('throws an alert when password was not entered', () => {
    const mockAction = jest.fn();
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });

    render(
      <FormComponent
        passwordNeeded={true}
        repeatPasswordNeeded={true}
        buttonText="Submit"
        action={mockAction}
      />
    );

    const passwordInput = screen.getByPlaceholderText('password')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(passwordInput, { target: { value: '' } })

    fireEvent.click(submitButton)

    expect(mockAlert).toHaveBeenCalledWith('Please fill in all required fields.')
    expect(mockAction).not.toHaveBeenCalled()

    mockAlert.mockRestore()
  })


  it('throws an alert when passwords do not match', () => {
    const mockAction = jest.fn();
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });

    render(
      <FormComponent
        passwordNeeded={true}
        repeatPasswordNeeded={true}
        buttonText="Submit"
        action={mockAction}
      />
    );

    const passwordInput = screen.getByPlaceholderText('password')
    const repeatPasswordInput = screen.getByPlaceholderText('repeat password')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(repeatPasswordInput, { target: { value: 'password456' } })

    fireEvent.click(submitButton)

    expect(mockAlert).toHaveBeenCalledWith('Passwords do not match')
    expect(mockAction).not.toHaveBeenCalled()

    mockAlert.mockRestore()
  })
})
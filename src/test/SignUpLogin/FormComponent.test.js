import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import FormComponent from '../../components/SignUp/FormComponent.js'

describe('FormComponent', () => {
  it('renders email input field when emailNeeded prop is true', () => {
    render(<FormComponent emailNeeded={true} />)
    const emailInput = screen.getByPlaceholderText('email')
    expect(emailInput).toBeInTheDocument()
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
        emailNeeded={true} 
        passwordNeeded={true} 
        repeatPasswordNeeded={true} 
        houseIdNeeded={true} 
        action={mockAction} 
        buttonText="Submit" 
      />
    )

    const emailInput = screen.getByPlaceholderText('email')
    const passwordInput = screen.getByPlaceholderText('password')
    const repeatPasswordInput = screen.getByPlaceholderText('repeat password')
    const houseIdInput = screen.getByPlaceholderText('house id')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(repeatPasswordInput, { target: { value: 'password123' } })
    fireEvent.change(houseIdInput, { target: { value: '123' } })

    fireEvent.click(submitButton)

    expect(mockAction).toHaveBeenCalledWith('test@example.com', 'password123', '123')
  })

  it('throws an alert when email was not entered', () => {
    const mockAction = jest.fn();
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <FormComponent 
        emailNeeded={true}
        buttonText="Submit"
        action={mockAction}
      />
    );

    const emailInput = screen.getByPlaceholderText('email')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(emailInput, { target: { value: '' } })

    fireEvent.click(submitButton)

    expect(mockAlert).toHaveBeenCalledWith('Please fill in all required fields.')
    expect(mockAction).not.toHaveBeenCalled()

    mockAlert.mockRestore()
  })

  it('throws an alert when password was not entered', () => {
    const mockAction = jest.fn();
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

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

  it('throws an alert when house id was not entered', () => {
    const mockAction = jest.fn();
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <FormComponent 
        houseIdNeeded={true}
        buttonText="Submit"
        action={mockAction}
      />
    );

    const houseIdInput = screen.getByPlaceholderText('house id')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(houseIdInput, { target: { value: 0 } })

    fireEvent.click(submitButton)

    expect(mockAlert).toHaveBeenCalledWith('Please fill in all required fields.')
    expect(mockAction).not.toHaveBeenCalled()

    mockAlert.mockRestore()
  })


  it('throws an alert when passwords do not match', () => {
    const mockAction = jest.fn();
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

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
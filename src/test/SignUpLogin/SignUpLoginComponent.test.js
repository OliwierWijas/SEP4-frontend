import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import SignUpLogin from '../../components/SignUp/SignUpLoginComponent.js'

describe('SignUpLogin component', () => {
    it('renders main content correctly', () => {
        const textArrayToDisplay = ['Title 1', 'Title 2', 'Subtitle']
        const mainButtonText = 'Submit'
        const action = jest.fn()

        render(
            <Router>
                <SignUpLogin 
                    textArrayToDisplay={textArrayToDisplay}
                    emailNeeded={true}
                    passwordNeeded={true}
                    repeatPasswordNeeded={true}
                    mainButtonText={mainButtonText}
                    action={action}
                />
            </Router>
        )

        textArrayToDisplay.forEach(text => {
            const textElement = screen.getByText(text)
            expect(textElement).toBeInTheDocument()
        })

        const submitButton = screen.getByText(mainButtonText)
        expect(submitButton).toBeInTheDocument()
    })

    it('calls action function with correct parameters when form is submitted', () => {
        const action = jest.fn()
        const emailNeeded = true
        const passwordNeeded = true
        const repeatPasswordNeeded = true

        render(
            <Router>
                <SignUpLogin 
                    emailNeeded={emailNeeded}
                    passwordNeeded={passwordNeeded}
                    repeatPasswordNeeded={repeatPasswordNeeded}
                    mainButtonText="Submit"
                    action={action}
                />
            </Router>
        )

        const emailInput = screen.getByPlaceholderText('email')
        const passwordInput = screen.getByPlaceholderText('password')
        const repeatPasswordInput = screen.getByPlaceholderText('repeat password')
        const submitButton = screen.getByText('Submit')

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })
        fireEvent.change(repeatPasswordInput, { target: { value: 'password123' } })
        fireEvent.click(submitButton)

        expect(action).toHaveBeenCalledWith('test@example.com', 'password123')
    })
})

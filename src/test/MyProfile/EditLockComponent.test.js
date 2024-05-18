import { render, fireEvent, screen } from '@testing-library/react';
import EditLockPassword from '../../components/MyProfile/EditLockPasswordComponent.js';

describe('EditLockPassword', () => {
    it('renders component with initial state', () => {
        render(<EditLockPassword />);
        expect(screen.getByTestId("member-box")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("New password...")).toBeInTheDocument();
        expect(screen.getByTestId("visibility-button")).toBeInTheDocument();
        expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it('toggles password visibility', () => {
        render(<EditLockPassword />);
        const passwordInput = screen.getByTestId("password-input");
        const visibilityButton = screen.getByTestId("visibility-button");

        // Initially, the password is hidden
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(screen.queryByTestId("eye-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("eye-slash-icon")).not.toBeInTheDocument();

        // Click to make the password visible
        fireEvent.click(visibilityButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        expect(screen.queryByTestId("eye-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("eye-slash-icon")).toBeInTheDocument();

        // Click to hide the password again
        fireEvent.click(visibilityButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(screen.queryByTestId("eye-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("eye-slash-icon")).not.toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        render(<EditLockPassword />);
        const passwordInput = screen.getByTestId("password-input");

        // Change the password input value
        fireEvent.change(passwordInput, { target: { value: 'new-password' } });
        expect(passwordInput).toHaveValue('new-password');
    });

    it('clears password input on button click', () => {
        render(<EditLockPassword />);
        const passwordInput = screen.getByTestId("password-input");
        const editButton = screen.getByText("Edit");

        // Set a password value
        fireEvent.change(passwordInput, { target: { value: 'new-password' } });
        expect(passwordInput).toHaveValue('new-password');

        // Click the button to clear the password
        fireEvent.click(editButton);
        expect(passwordInput).toHaveValue('');
    });
});

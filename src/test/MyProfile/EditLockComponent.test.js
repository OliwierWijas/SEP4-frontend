import { render, fireEvent, screen } from '@testing-library/react';
import EditLockPassword from '../../components/MyProfile/EditLockPasswordComponent.js';
import { AuthContext } from '../../auth/AuthContext.js';

describe('EditLockPassword', () => {
    const providerProps = { claims: { token: 'mock-token', role: "Admin", houseId: 1 } }

    const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
      return render(
        <AuthContext.Provider value={providerProps}>
          {ui}
        </AuthContext.Provider>,
        renderOptions
      )
    }

    it('renders component with initial state', () => {
        renderWithAuthContext(<EditLockPassword />, { providerProps });
        expect(screen.getByTestId("member-box")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("New password...")).toBeInTheDocument();
        expect(screen.getByTestId("visibility-button")).toBeInTheDocument();
        expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it('toggles password visibility', () => {
        renderWithAuthContext(<EditLockPassword />, { providerProps });
        const passwordInput = screen.getByTestId("password-input");
        const visibilityButton = screen.getByTestId("visibility-button");

        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(screen.queryByTestId("eye-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("eye-slash-icon")).not.toBeInTheDocument();

        fireEvent.click(visibilityButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        expect(screen.queryByTestId("eye-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("eye-slash-icon")).toBeInTheDocument();

        fireEvent.click(visibilityButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(screen.queryByTestId("eye-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("eye-slash-icon")).not.toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        renderWithAuthContext(<EditLockPassword />, { providerProps });
        const passwordInput = screen.getByTestId("password-input");

        fireEvent.change(passwordInput, { target: { value: 'new-password' } });
        expect(passwordInput).toHaveValue('new-password');
    });

    it('clears password input on button click', () => {
        renderWithAuthContext(<EditLockPassword />, { providerProps });
        const passwordInput = screen.getByTestId("password-input");
        const editButton = screen.getByText("Edit");

        fireEvent.change(passwordInput, { target: { value: 'new-password' } });
        expect(passwordInput).toHaveValue('new-password');

        fireEvent.click(editButton);
        expect(passwordInput).toHaveValue('');
    });
});

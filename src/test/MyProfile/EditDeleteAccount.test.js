import { render, fireEvent, screen, getByTestId } from '@testing-library/react'
import EditDeleteAccount from '../../components/MyProfile/EditDeleteAccount.js'
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';

const providerProps = { claims: { token: 'mock-token', role: "Admin", username: "username", password: "password" } }

const renderWithAuthContextAndRouter = (
  ui,
  { providerProps, route = '/', ...renderOptions }) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <AuthContext.Provider value={providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>,
    renderOptions
  );
};

describe('Edit/Delete Account', () => {
  it('renders component with the initial value', () => {
    renderWithAuthContextAndRouter(<EditDeleteAccount setEditProfileOpen={jest.fn()} />, { providerProps });
    expect(screen.getByTestId("username-div")).toBeInTheDocument();
    expect(screen.getByTestId("password-div")).toBeInTheDocument();
    expect(screen.getByTestId("makeinvisible")).toBeInTheDocument();
    expect(screen.getByTestId("savedelete")).toBeInTheDocument();
    expect(screen.getByTestId("makeinvisible")).toBeInTheDocument();

    const usernameDiv = screen.getByTestId("username-div")
    const passwordDiv = screen.getByTestId("password-div")

    expect(usernameDiv).toHaveTextContent("username");
    expect(passwordDiv).toHaveTextContent("********");
  });

  it('clicking on eye makes the password visible/hidden', () => {
    renderWithAuthContextAndRouter(<EditDeleteAccount setEditProfileOpen={jest.fn()} />, { providerProps });

    const passwordDiv = screen.getByTestId("password-div")
    const password = passwordDiv.textContent;

    fireEvent.click(screen.getByTestId("makeinvisible"));
    expect(passwordDiv).toHaveTextContent("password")
    fireEvent.click(screen.getByTestId("makevisible"));
    expect(passwordDiv).toHaveTextContent("*".repeat(password.length))

  })


  it('transition to and from editing state', () => {
    renderWithAuthContextAndRouter(<EditDeleteAccount setEditProfileOpen={jest.fn()} />, { providerProps })
    fireEvent.click(screen.getByTestId("toggleEditing"));
    expect(screen.getByText("EDIT")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("closeEditing")).toBeInTheDocument();
    expect(screen.getByText("SAVE")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("closeEditing"));
    expect(screen.getByText("MY INFO")).toBeInTheDocument();
    expect(screen.queryByTestId("password-input")).not.toBeInTheDocument();
    expect(screen.queryByTestId("username-input")).not.toBeInTheDocument();
    expect(screen.getByTestId("toggleEditing")).toBeInTheDocument();
    expect(screen.getByText("DELETE ACCOUNT")).toBeInTheDocument();
  })
})
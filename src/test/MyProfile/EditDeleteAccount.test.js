import { render, fireEvent, screen, getByTestId } from '@testing-library/react'
import EditDeleteAccount from '../../components/MyProfile/EditDeleteAccount.js'
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Edit/Delete Account', () => {
  it('renders component with the initial value', () => {
    localStorage.setItem("username", "username")
    localStorage.setItem("password", "password")

    renderWithRouter(<EditDeleteAccount setEditProfileOpen={jest.fn()} />);
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
    renderWithRouter(<EditDeleteAccount setEditProfileOpen={jest.fn()} />);

    const passwordDiv = screen.getByTestId("password-div")
    const password = passwordDiv.textContent;

    fireEvent.click(screen.getByTestId("makeinvisible"));
    expect(passwordDiv).toHaveTextContent("password")
    fireEvent.click(screen.getByTestId("makevisible"));
    expect(passwordDiv).toHaveTextContent("*".repeat(password.length))

  })


  it('transition to and from editing state', () => {
    renderWithRouter(<EditDeleteAccount setEditProfileOpen={jest.fn()} />)
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

  /*it('handles input changes correctly', () => {
    render(<EditDeleteAccount setEditProfileOpen={jest.fn()} />);
    fireEvent.click(screen.getByTestId("toggleEditing"));

    fireEvent.change(screen.getByTestId("username-input"), { target: { value: 'newusername' } });
    fireEvent.change(screen.getByTestId("password-input"), { target: { value: 'newpassword123' } });

    fireEvent.click(screen.getByTestId("makeinvisible"));

    fireEvent.click(screen.getByText("SAVE"));

    const usernameDiv = screen.getByTestId("username-div")
    const passwordDiv = screen.getByTestId("password-div")

    expect(usernameDiv).toHaveTextContent("newusername")
    expect(passwordDiv).toHaveTextContent("newpassword123")
  })*/

  it('check delete buttons changes the state', () => {
    const MockSetEditProfile = jest.fn()
    renderWithRouter(<EditDeleteAccount setEditProfileOpen={MockSetEditProfile} />);
    fireEvent.click(screen.getByTestId("savedelete"));
    expect(MockSetEditProfile).toHaveBeenCalled();

  })
})
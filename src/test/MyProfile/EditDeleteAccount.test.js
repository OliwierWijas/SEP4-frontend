import { render, fireEvent, screen, getByTestId } from '@testing-library/react'
import EditDeleteAccount from '../../components/MyProfile/EditDeleteAccount.js'

describe('Edit/Delete Account', () =>{
    it('renders component with the initial value', ()=>{
        render(<EditDeleteAccount setEditProfileOpen={jest.fn()}/>);
        expect(screen.getByTestId("username-div")).toBeInTheDocument();
        expect(screen.getByTestId("password-div")).toBeInTheDocument();
        expect(screen.getByTestId("makeinvisible")).toBeInTheDocument();
        expect(screen.getByTestId("savedelete")).toBeInTheDocument();
        expect(screen.getByTestId("makeinvisible")).toBeInTheDocument();

        const usernameDiv = screen.getByTestId("username-div")
        const passwordDiv = screen.getByTestId("password-div")

        expect(usernameDiv).toHaveTextContent("John");
        expect(passwordDiv).toHaveTextContent("******");
      });

      it('clicking on eye makes the password visible/hidden', ()=>{
        render(<EditDeleteAccount setEditProfileOpen={jest.fn()}/>);

        const passwordDiv = screen.getByTestId("password-div")
        const password = passwordDiv.textContent;

        fireEvent.click(screen.getByTestId("makeinvisible"));
        expect(passwordDiv).toHaveTextContent("123123")
        fireEvent.click(screen.getByTestId("makevisible"));
        expect(passwordDiv).toHaveTextContent("*".repeat(password.length))
        
      })


    it('transition to and from editing state', ()=>{
        render(<EditDeleteAccount setEditProfileOpen={jest.fn()}/>)
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
    test('handles input changes correctly', () => {
        render(<EditDeleteAccount setEditProfileOpen={jest.fn()} />);
        fireEvent.click(screen.getByTestId("toggleEditing"));
        
        fireEvent.change(screen.getByTestId("username-input"), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: '456456' } });
      
        fireEvent.click(screen.getByText("SAVE"));
        
        const usernameDiv = screen.getByTestId("username-div")
        const passwordDiv = screen.getByTestId("password-div")

        fireEvent.click(screen.getByTestId("makeinvisible"));

        expect(usernameDiv).toHaveTextContent("Jane")
        expect(passwordDiv).toHaveTextContent("456456")
      })

      test('check delete buttons changes the state', ()=>{
        const MockSetEditProfile = jest.fn()
        render(<EditDeleteAccount setEditProfileOpen={MockSetEditProfile}/>);
        fireEvent.click(screen.getByTestId("savedelete"));
        expect(MockSetEditProfile).toHaveBeenCalled();

      })
})
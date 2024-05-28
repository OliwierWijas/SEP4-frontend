import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HouseMembersComponent from '../../components/MyProfile/HouseMembersComponent.js';
import { useDeleteMember } from '../../hooks/home/useDeleteMember.js';
import { AuthContext } from '../../auth/AuthContext.js';

jest.mock('../../hooks/home/useDeleteMember.js', () => ({
  useDeleteMember: jest.fn(() => jest.fn())
}))

describe('HouseMembersComponent', () => {
  const providerProps = { claims: { token: 'mock-token', role: "Admin", houseId: 1 } }

  const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <AuthContext.Provider value={providerProps}>
        {ui}
      </AuthContext.Provider>,
      renderOptions
    )
  }

  let useDeleteMemberMock
  const member = { houseId: 1, username: 'TestUser' };

  beforeEach(() => {
    useDeleteMemberMock = require('../../hooks/home/useDeleteMember.js').useDeleteMember
    useDeleteMemberMock.mockReturnValue(jest.fn())
  });

  test('renders member username correctly', () => {
    renderWithAuthContext(<HouseMembersComponent member={member} />, { providerProps });
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });

  test('calls deleteMember function when delete button is clicked', async () => {
    renderWithAuthContext(<HouseMembersComponent member={member}/>, { providerProps });
    
    const deleteMember = useDeleteMember()
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    expect(deleteMember).toHaveBeenCalledWith('TestUser', undefined, "mock-token");
  
    await waitFor(() => {
      expect(useDeleteMemberMock).toHaveBeenCalled();
    });
  });
});

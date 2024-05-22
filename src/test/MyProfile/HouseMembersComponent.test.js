import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HouseMembersComponent from '../../components/MyProfile/HouseMembersComponent.js';
import { useDeleteMember } from '../../hooks/home/useDeleteMember.js';

jest.mock('../../hooks/home/useDeleteMember.js', () => ({
  useDeleteMember: jest.fn(() => jest.fn())
}))

describe('HouseMembersComponent', () => {
  let useDeleteMemberMock
  const member = { houseId: 1, username: 'TestUser' };

  beforeEach(() => {
    useDeleteMemberMock = require('../../hooks/home/useDeleteMember.js').useDeleteMember
    useDeleteMemberMock.mockReturnValue(jest.fn())
  });

  test('renders member username correctly', () => {
    render(<HouseMembersComponent member={member} />);
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });

  test('calls deleteMember function when delete button is clicked', async () => {
    render(<HouseMembersComponent member={member}/>);
    
    const deleteMember = useDeleteMember()
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    expect(deleteMember).toHaveBeenCalledWith('TestUser', expect.anything());
  
    await waitFor(() => {
      expect(useDeleteMemberMock).toHaveBeenCalled();
    });
  });
});

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HouseMembersComponent from '../../components/MyProfile/HouseMembersComponent.js';
import { useDeleteMember } from '../../hooks/home/useDeleteMember.js';

jest.mock('../../hooks/useDeleteMember.js');

describe('HouseMembersComponent', () => {
  const member = { houseId: 1, username: 'TestUser' };
  const onDeleteMember = jest.fn();

  beforeEach(() => {
    useDeleteMember.mockReturnValue({
      deleteMember: jest.fn().mockResolvedValue(),
    });
  });

  test('renders member username correctly', () => {
    render(<HouseMembersComponent member={member} onDeleteMember={onDeleteMember} />);
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });

  test('calls deleteMember function when delete button is clicked', async () => {
    const deleteMemberMock = jest.fn().mockResolvedValueOnce();
    useDeleteMember.mockReturnValue({
      deleteMember: deleteMemberMock,
    });
  
    const onDeleteMemberMock = jest.fn();
    render(<HouseMembersComponent member={member} onDeleteMember={onDeleteMemberMock} />);
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    expect(deleteMemberMock).toHaveBeenCalledWith({ houseId: 1, username: 'TestUser' });
  
    await waitFor(() => {
      expect(onDeleteMemberMock).toHaveBeenCalled();
    });
  });
  
  
});

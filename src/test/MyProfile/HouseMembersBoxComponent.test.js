import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HouseMembersBoxComponent from '../../components/MyProfile/HouseMembersBoxComponent';
import { useMembers } from '../../hooks/home/useMembers.js';
import { useAddMember } from '../../hooks/home/useAddMember.js';
import { useDeleteMember } from '../../hooks/home/useDeleteMember.js';

jest.mock('../../hooks/home/useMembers.js', () => ({
  useMembers: jest.fn()
}))

jest.mock('../../hooks/home/useAddMember.js', () => ({
  useAddMember: jest.fn(() => jest.fn())
}))

jest.mock('../../hooks/home/useDeleteMember.js', () => ({
  useDeleteMember: jest.fn(() => jest.fn())
}))

describe('HouseMembersBoxComponent', () => {
  let useMembersMock, useAddMemberMock, useDeleteMemberMock

  beforeEach(() => {
    useMembersMock = require('../../hooks/home/useMembers.js').useMembers
    useMembersMock.mockReturnValue([{username: "admin"}, {username: "member1"}])
    useAddMemberMock = require('../../hooks/home/useAddMember.js').useAddMember
    useAddMemberMock.mockReturnValue(jest.fn())
    useDeleteMemberMock = require('../../hooks/home/useDeleteMember.js').useDeleteMember
    useDeleteMemberMock.mockReturnValue(jest.fn())
  })

  it('renders without crashing', () => {
    render(<HouseMembersBoxComponent />);
  });


  it('adds a member correctly', async () => {
    render(<HouseMembersBoxComponent />);

    const input = screen.getByTestId("username-input");
    fireEvent.change(input, { target: { value: 'NewUser' } });
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const addMember = useAddMember()

    expect(addMember).toHaveBeenCalledWith("NewUser", expect.anything())
  });

  it('deletes a member correctly', async () => {
    render(<HouseMembersBoxComponent />);

    const deleteMember = useDeleteMember()

    const members = await screen.findAllByTestId("house-member")
    const member = members[0]
    expect(member).toBeInTheDocument();


    const deleteButton = (await screen.findAllByTestId('delete-button'))[0];
    fireEvent.click(deleteButton)

    expect(deleteMember).toHaveBeenCalledWith("admin", expect.anything())
  });
});
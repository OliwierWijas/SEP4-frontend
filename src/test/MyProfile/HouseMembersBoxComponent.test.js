import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HouseMembersBoxComponent from '../../components/MyProfile/HouseMembersBoxComponent';
// Mocking the useMembers hook
jest.mock('../../hooks/useMembers.js', () => ({
    useMembers: jest.fn(() => [
        { username: 'John' },
        { username: 'Alice' },
        { username: 'Bob' }
    ])
}));

describe('HouseMembersBoxComponent', () => {
    test('renders HouseMembersComponent for each member', () => {
        render(<HouseMembersBoxComponent />);
        const houseMembersComponents = screen.getAllByTestId('member-item');
        expect(houseMembersComponents).toHaveLength(3);
    });

    test('calls handleDeleteMember when delete button is clicked', () => {
        render(<HouseMembersBoxComponent />);
        const deleteButtons = screen.getAllByTestId('delete-button');
        fireEvent.click(deleteButtons[0]); // Assuming there's at least one member rendered
        const houseMembersComponentsAfterDelete = screen.getAllByTestId('member-item');
        expect(houseMembersComponentsAfterDelete).toHaveLength(2);
    });

    test('calls handleAddMember when adding a new member', () => {
        render(<HouseMembersBoxComponent />);
        const input = screen.getByPlaceholderText('Enter username...');
        const addButton = screen.getByText('Add');
        fireEvent.change(input, { target: { value: 'NewMember' } });
        fireEvent.click(addButton);
        const houseMembersComponentsAfterAdd = screen.getAllByTestId('member-item');
        expect(houseMembersComponentsAfterAdd).toHaveLength(4);
    });
});

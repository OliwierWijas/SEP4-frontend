import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HouseMembersBoxComponent from '../../components/MyProfile/HouseMembersBoxComponent';

describe('HouseMembersBoxComponent', () => {

  test('renders without crashing', () => {
    render(<HouseMembersBoxComponent />);
  });


  it('adds a member correctly', async () => {
    render(<HouseMembersBoxComponent />);

    const input = screen.getByTestId("username-input");
    fireEvent.change(input, { target: { value: 'NewUser' } });
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const members = await screen.findAllByTestId("house-member"); 
    const member = members[5]
    expect(member).toBeInTheDocument();
  });

  /*test('deletes a member correctly', async () => {
    render(<HouseMembersBoxComponent />);

    const members = await screen.findAllByTestId("house-member")
    const member = members[4]
    expect(member).toBeInTheDocument();


    const deleteButton = (await screen.findAllByTestId('delete-button'))[4];
    fireEvent.click(deleteButton)

    expect(member).not.toBeInTheDocument()
  });*/

});

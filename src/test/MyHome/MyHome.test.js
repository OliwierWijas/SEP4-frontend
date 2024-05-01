import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyHome from '../../routes/MyHome';

/*jest.mock('../../components/MyHome/GraphComponent/GraphComponent', () => {
    return () => <div data-testid="mock-graph">Mock Graph</div>;
});

jest.mock('../../components/MyHome/GraphComponent/DataIntervalPicker', () => {
    return () => <div data-testid="mock-data-picker">Mock Data Picker</div>;
});*/


describe('MyHomeComponent', () => {
  it('', () => {
    
  })
  /*it('renders house and room management components', () => {
    render(<MyHome />);
    expect(screen.getByTestId('house')).toBeInTheDocument();
    expect(screen.getByTestId('room-management')).toBeInTheDocument();
  });*/

  /*it('updates graph data when selected value changes', () => {
    render(<MyHome />);
    const selectElement = screen.getByText('Temperature');
    fireEvent.change(selectElement, { target: { value: 'Humidity' } });
    expect(screen.getByText('Humidity')).toBeInTheDocument()
  });*/

  /*it('updates reading data once clicked on the room', () => {
    render(<MyHome />);
    const rooms = screen.getAllByTestId('roomDiv')
    expect(rooms.length).toBe(11)

    fireEvent.click(rooms[0])

    expect(screen.getByText('Bedroom1')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })*/
});

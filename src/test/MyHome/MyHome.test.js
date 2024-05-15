import React from 'react'
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import MyHome from '../../routes/MyHome.js'
import { Chart } from 'chart.js';
import 'jest-canvas-mock';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

describe('myHome Component Tests', () => {
  it('renders without crashing', async () => {
    render(<MyHome />)
    expect(await screen.findByText('Temperature')).toBeInTheDocument()
    expect(await screen.findByTestId('popup-children')).toBeInTheDocument()
  })

  it('room selection updates state', async () => {
    render(<MyHome />)
    const rooms = await screen.findAllByTestId('room')
    fireEvent.click(rooms[0])
    expect(screen.getByTestId('room-name-header')).toContainHTML("Living Room")
    fireEvent.click(rooms[1])
    expect(screen.getByTestId('room-name-header')).toContainHTML("Hall")
  })

  jest.mock("../../hooks/useTemperature.js", () => ({
    useTemperature: jest.fn(() => [{ date: new Date(), value: 25 }]),
  }))

  it('temperature data is fetched and displayed', async () => {
    render(<MyHome />)
    expect(await screen.findByText('25')).toBeInTheDocument()
  })

  it('graph data updates based on room and interval', async () => {
    render(<MyHome />)
    fireEvent.click(screen.queryAllByTestId('room')[0])
    expect(await screen.findByText('25')).toBeInTheDocument()
  })

  it('create room pop-up opens and closes', async () => {
    render(<MyHome />)
    fireEvent.click(await screen.findByTestId('create-room-button'))

    const popupChild = await screen.findByTestId('popup-children')
    expect(popupChild).toBeInTheDocument()

    const popup = await screen.findByTestId('popup')
    expect(popup).toBeInTheDocument()
    expect(popup).toHaveClass('z-10')

    const close = await screen.findByTestId('close-popup')
    expect(close).toBeInTheDocument()
    fireEvent.click(close)

    expect(popup).toHaveClass('z-0')
  })

  it('graph data updates correctly with multiple temperature data points', async () => {
    jest.mock('../../hooks/useTemperature.js', () => ({
      useTemperature: jest.fn(() => [
        { date: new Date('2024-05-01'), value: 20 },
        { date: new Date('2024-05-02'), value: 22 },
        { date: new Date('2024-05-03'), value: 25 },
      ]),
    }))
    render(<MyHome />);
    expect(await screen.findByText('20')).toBeInTheDocument()
    expect(await screen.findByText('22')).toBeInTheDocument()
    expect(await screen.findByText('25')).toBeInTheDocument()
  })
})
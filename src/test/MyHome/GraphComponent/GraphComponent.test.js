import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import GraphComponent from '../../../components/MyHome/GraphComponent/GraphComponent';
import { Chart } from 'chart.js';
import 'jest-canvas-mock';

jest.mock('react-chartjs-2', () => ({
  Line: ({ data }) => (
    <div data-testid="mock-line-chart">
      {data.labels.map((label, index) => (
        <div key={index}>
          <span data-testid={`label-${index}`}>{label}</span>
          <span data-testid={`data-${index}`}>{data.datasets[0].data[index]}</span>
        </div>
      ))}
    </div>
  ),
}));

describe('GraphComponent', () => {
  const mockData = {
    labels: ['01/01/2024', '01/02/2024', '01/03/2024'],
    datasets: [{
      label: 'Temperature',
      data: [20, 22, 21],
    }],
  };

  it('renders GraphComponent correctly', () => {
    render(<GraphComponent data={mockData} />);
    const lineChart = screen.getByTestId('mock-line-chart')
    expect(lineChart).toBeInTheDocument()
  })

  it('renders the correct data', () => {
    render(<GraphComponent data={mockData} />);
    expect(screen.getByTestId('label-0')).toHaveTextContent('01/01/2024');
    expect(screen.getByTestId('data-0')).toHaveTextContent('20');

    expect(screen.getByTestId('label-1')).toHaveTextContent('01/02/2024');
    expect(screen.getByTestId('data-1')).toHaveTextContent('22');

    expect(screen.getByTestId('label-2')).toHaveTextContent('01/03/2024');
    expect(screen.getByTestId('data-2')).toHaveTextContent('21');
  })
});

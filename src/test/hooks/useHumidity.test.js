import { renderHook } from '@testing-library/react-hooks';
import { useHumidity } from '../../hooks/conditions/useHumidityHistory.js';

describe('useHumidity', () => {
  it('fetches humidity data and sets state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHumidity());

    await waitForNextUpdate();

    expect(result.current).toEqual(expect.objectContaining({ 
      value: expect.any(Number), 
      readAt: expect.any(Date) 
    }));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/reading', { signal: expect.any(AbortSignal) });
  });

  /*it('handles fetch error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() => useHumidity());

    await waitForNextUpdate();

    expect(result.current).toBeNull();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://localhost:8080/reading/humidity', { signal: expect.any(AbortSignal) });

    expect(console.log).toHaveBeenCalledWith('Error fetching humidity data: Error: Failed to fetch');
  });*/
});

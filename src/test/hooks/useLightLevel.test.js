import { renderHook } from '@testing-library/react-hooks';
import { useLightLevel } from '../../hooks/useLightLevel.js';

describe('useLightLevel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches light level data and sets state', async () => {
    const mockLightLevelData = { lightLevel: 50 };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockLightLevelData),
    });

    const { result, waitForNextUpdate } = renderHook(() => useLightLevel());

    await waitForNextUpdate();

    expect(result.current).toEqual(mockLightLevelData);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://localhost:8080/reading/light', { signal: expect.any(AbortSignal) });
  });
});

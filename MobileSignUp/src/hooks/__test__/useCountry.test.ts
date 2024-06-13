import { renderHook, act } from '@testing-library/react-hooks';
import useCountry  from '../useCountry';
import { ThemeProvider } from '../../ThemeContext';


const mockSetThemeName = jest.fn();
jest.mock('../../ThemeContext', () => ({
  useTheme: () => ({
    setThemeName: mockSetThemeName,
  }),
}));

describe('useCountry', () => {
  it('should initialize with default country as india', () => {
    const { result } = renderHook(() => useCountry());
    expect(result.current.country).toBe('india');
  });

  it('should update country and call setThemeName on country change', () => {
    const { result } = renderHook(() => useCountry());
    act(() => {
      result.current.onCountryValueChange('spain');
    });
    expect(result.current.country).toBe('spain');
    expect(mockSetThemeName).toHaveBeenCalledWith('spain');
  });
});

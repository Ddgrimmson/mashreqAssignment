import { renderHook, act } from '@testing-library/react-hooks';
import useCountry from '../useCountry';  // Adjust the import path as needed

describe('useCountry', () => {
  test('should use country with initial value', () => {
    const { result } = renderHook(() => useCountry());
    expect(result.current.country).toBe('india');
  });

  test('should update country value', () => {
    const { result } = renderHook(() => useCountry());
    
    act(() => {
      result.current.onCountryValueChange('usa');
    });
    
    expect(result.current.country).toBe('usa');
  });
});

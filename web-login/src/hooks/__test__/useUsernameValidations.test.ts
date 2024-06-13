import { renderHook } from '@testing-library/react-hooks';
import useUsernameValidation from '../useUsernameValidations';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

describe('useUsernameValidation', () => {

  test('returns undefined for valid username - india', () => {
    const { result } = renderHook(() => useUsernameValidation());
    expect(result.current.getUsernameErrorMessage('india', 'abcde')).toBeUndefined();
  });

  test('returns error message for invalid username - india', () => {
    const { result } = renderHook(() => useUsernameValidation());
    expect(result.current.getUsernameErrorMessage('india', 'abcd')).toBe('login.errors.Username should be alphanumeric with atleast 5 characters');
  });

  test('returns undefined for valid username - uk', () => {
    const { result } = renderHook(() => useUsernameValidation());
    expect(result.current.getUsernameErrorMessage('uk', 'aabcde')).toBeUndefined();
  });

  test('returns error message for invalid username - uk', () => {
    const { result } = renderHook(() => useUsernameValidation());
    expect(result.current.getUsernameErrorMessage('uk', '1abcde')).toBe('login.errors.Username should begin with alphabets and can be alphanumeric with atleast 5 characters');
  });

  test('returns undefined for valid username - spain', () => {
    const { result } = renderHook(() => useUsernameValidation());
    expect(result.current.getUsernameErrorMessage('spain', 'abcdef')).toBeUndefined();
  });

  test('returns error message for invalid username - spain', () => {
    const { result } = renderHook(() => useUsernameValidation());
    expect(result.current.getUsernameErrorMessage('spain', 'abcde')).toBe('login.errors.Username should contain alphabets and atleast 6 characters');
  });

  test('returns undefined for valid username - thailand', () => {
    const { result } = renderHook(() => useUsernameValidation());
    expect(result.current.getUsernameErrorMessage('thailand', 'abcd')).toBeUndefined();
  });

  test('returns error message for invalid username - thailand', () => {
    const { result } = renderHook(() => useUsernameValidation());
    expect(result.current.getUsernameErrorMessage('thailand', 'ABC')).toBe('login.errors.Username should contain lower case alphabets and atleast 4 characters');
  });
});


import { renderHook } from '@testing-library/react-hooks';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import useUsernameValidation from './../useUsernameValidations';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        "signUp": {
          "errors": {
            "Username should be alphanumeric with atleast 5 characters": "Username should be alphanumeric with atleast 5 characters",
            "Username should begin with alphabets and can be alphanumeric with atleast 5 characters": "Username should begin with alphabets and can be alphanumeric with atleast 5 characters",
            "Username should contain alphabets and atleast 6 characters": "Username should contain alphabets and atleast 6 characters",
            "Username should contain lower case alphabets and atleast 4 characters": "Username should contain lower case alphabets and atleast 4 characters",
          }
        }
      }
    }
  }
});

describe('useUsernameValidation', () => {
  it('returns correct validation pattern and error message for India', () => {
    const { result } = renderHook(() => useUsernameValidation());

    expect(result.current.getUsernamePattern('india')).toEqual(/^[a-zA-Z0-9]{5,}$/);
    expect(result.current.getUsernameErrorMessage('india')).toBe("Username should be alphanumeric with atleast 5 characters");
  });

  it('returns correct validation pattern and error message for UK', () => {
    const { result } = renderHook(() => useUsernameValidation());

    expect(result.current.getUsernamePattern('uk')).toEqual(/^[a-zA-Z][a-zA-Z0-9]{5,}$/);
    expect(result.current.getUsernameErrorMessage('uk')).toBe("Username should begin with alphabets and can be alphanumeric with atleast 5 characters");
  });

  it('returns correct validation pattern and error message for Spain', () => {
    const { result } = renderHook(() => useUsernameValidation());

    expect(result.current.getUsernamePattern('spain')).toEqual(/^[a-zA-Z]{6,}$/);
    expect(result.current.getUsernameErrorMessage('spain')).toBe("Username should contain alphabets and atleast 6 characters");
  });

  it('returns correct validation pattern and error message for Thailand', () => {
    const { result } = renderHook(() => useUsernameValidation());

    expect(result.current.getUsernamePattern('thailand')).toEqual(/^[a-z0-9]{4,}$/);
    expect(result.current.getUsernameErrorMessage('thailand')).toBe("Username should contain lower case alphabets and atleast 4 characters");
  });
});

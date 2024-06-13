import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../LoginPage';
import { useTheme } from '../../theme/context';
import useUsernameValidation from '../../hooks/useUsernameValidations';
import useCountry from '../../hooks/useCountry';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { useTranslation } from 'react-i18next';

jest.mock('../../theme/context', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../../hooks/useUsernameValidations', () => jest.fn());
jest.mock('../../hooks/useCountry', () => jest.fn());
jest.mock('../../hooks/useFirebaseAuth', () => jest.fn());
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('LoginPage', () => {
  const setThemeName = jest.fn();
  const signIn = jest.fn();
  const onCountryValueChange = jest.fn();
  const getUsernameErrorMessage = jest.fn();
  const t = jest.fn((key) => key);

  beforeEach(() => {
    useTheme.mockReturnValue({ setThemeName });
    useFirebaseAuth.mockReturnValue({ signIn });
    useCountry.mockReturnValue({ country: 'india', onCountryValueChange });
    useUsernameValidation.mockReturnValue({ getUsernameErrorMessage });
    useTranslation.mockReturnValue({ t });

    setThemeName.mockClear();
    signIn.mockClear();
    onCountryValueChange.mockClear();
    getUsernameErrorMessage.mockClear();
    t.mockClear();
  });


  test('displays username validation error', async () => {
    render(<LoginPage />);

    const countrySelect = screen.getByTestId('country').querySelector('[role="combobox"]');
    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('submitBtn');

    userEvent.click(countrySelect);
    const allOptions = await screen.findAllByRole('option');
    userEvent.click(allOptions[0]);
    userEvent.click(usernameInput)
    await userEvent.keyboard('inv');
    userEvent.click(passwordInput)
    await userEvent.keyboard('password');

    getUsernameErrorMessage.mockReturnValue('Invalid username');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid username')).toBeInTheDocument();
      expect(signIn).not.toHaveBeenCalled();
    });
  });


  test('displays translated text', () => {
    t.mockImplementation((key) => {
      const translations = {
        'login.signIn': 'Sign In',
        'login.country': 'Country',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.submitBtn': 'Submit',
      };
      return translations[key] || key;
    });

    render(<LoginPage />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});

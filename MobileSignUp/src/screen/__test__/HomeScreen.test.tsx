import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import useCountry from '../../hooks/useCountry';
import useUsernameValidation from '../../hooks/useUsernameValidations';
import {auth, firestore} from '../../config/firebase';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '../../ThemeContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

jest.mock('../../hooks/useCountry', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../hooks/useUsernameValidations', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../config/firebase', () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(),
  },
  firestore: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
      })),
    })),
  },
}));

jest.mock('react-hook-form', () => {
    const originalModule = jest.requireActual('react-hook-form');
    return {
      ...originalModule,
    };
  });

const mockNavigation = {navigate: jest.fn()};

const Setup = () => (
  <ThemeProvider>
    <NavigationContainer>
      <HomeScreen navigation={mockNavigation} />
    </NavigationContainer>
  </ThemeProvider>
);

describe('HomeScreen', () => {
  beforeEach(() => {
    (useCountry as jest.Mock).mockReturnValue({
      country: 'india',
      onCountryValueChange: jest.fn(),
    });

    (useUsernameValidation as jest.Mock).mockReturnValue({
      getUsernamePattern: jest.fn().mockReturnValue(/^[a-zA-Z0-9]{5,}$/),
      getUsernameErrorMessage: jest
        .fn()
        .mockReturnValue(
          'Username should be alphanumeric with atleast 5 characters',
        ),
    });
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <Setup />
    );

    expect(getByText('signUp.country')).toBeTruthy();
    expect(getByText('signUp.countries.UnitedKingdom')).toBeTruthy();
    expect(getByText('signUp.countries.India')).toBeTruthy();
    expect(getByText('signUp.countries.Spain')).toBeTruthy();
    expect(getByText('signUp.countries.Thailand')).toBeTruthy();
  });

  it('displays validation errors for empty fields', async () => {
    const {getByText} = render(
      <Setup />
    );

    await fireEvent.press(getByText('signUp.submitBtn'));

    await waitFor(() => {
      expect(getByText('signUp.errors.emailRequired')).toBeTruthy();
      expect(getByText('signUp.errors.userNameRequired')).toBeTruthy();
      expect(getByText('signUp.errors.passwordRequired')).toBeTruthy();
    });
  });

  it('submits the form with valid data', async () => {
    (auth.createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: {
        uid: 'test-uid',
        updateProfile: jest.fn().mockResolvedValue(null),
      },
    });
    (firestore.collection().doc().set as jest.Mock).mockResolvedValue(null);

    const {getByLabelText, getByText} = render(
        <Setup />
    );

    fireEvent.changeText(getByLabelText('signUp.email'), 'test@example.com');
    fireEvent.changeText(getByLabelText('signUp.username'), 'testuser');
    fireEvent.changeText(getByLabelText('signUp.password'), 'password123');
    fireEvent.changeText(
      getByLabelText('signUp.confirmPassword'),
      'password123',
    );

    fireEvent.press(getByText('signUp.submitBtn'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Status', {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        username: 'testuser',
        success: true,
      });
    });
  });

  it('handles form submission failure', async () => {
    const error = new Error('Signup failed');
    (auth.createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    const {getByLabelText, getByText} = render(
        <Setup />
    );

    fireEvent.changeText(getByLabelText('signUp.email'), 'test@example.com');
    fireEvent.changeText(getByLabelText('signUp.username'), 'testuser');
    fireEvent.changeText(getByLabelText('signUp.password'), 'password123');
    fireEvent.changeText(
      getByLabelText('signUp.confirmPassword'),
      'password123',
    );

    fireEvent.press(getByText('signUp.submitBtn'));

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalled();
    });

    consoleErrorMock.mockRestore();
  });
});

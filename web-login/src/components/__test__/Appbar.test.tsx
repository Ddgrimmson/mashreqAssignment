import React from 'react';
import { render, screen } from '@testing-library/react';
import Appbar from '../Appbar';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../config/i18n'; // Ensure this path is correct

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Appbar', () => {
  test('renders without crashing', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Appbar />
      </I18nextProvider>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('displays the application name', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Appbar />
      </I18nextProvider>
    );
    expect(screen.getByText('appName')).toBeInTheDocument();
  });

  test('contains LanguageSelector component', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Appbar />
      </I18nextProvider>
    );
    expect(screen.getByTestId('language-buton')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import LanguageSelector from '../LanguageSelector';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../config/i18n';


jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('LanguageSelector', () => {
  test('renders without crashing', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('opens modal on button click', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('selectLanguage')).toBeInTheDocument();
  });

  test('closes modal on language selected', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('English'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });


  test('highlights selected language', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    const selectedItem = screen.getByText('English').closest('li');
    expect(selectedItem).toHaveAttribute('aria-selected', 'true');
  });
});

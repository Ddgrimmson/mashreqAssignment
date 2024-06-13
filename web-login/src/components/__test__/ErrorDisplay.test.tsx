import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorDisplay from '../ErrorDisplay';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import errorReducer from '../../store/errorSlice';
import { RootState } from '../../store/store';
import { act } from 'react-dom/test-utils';

// Mocked initial state for error
const initialState = {
  error: {
    error: {
      message: 'Test error message',
    },
  },
};

// Create a custom store for testing
const createStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      error: errorReducer,
    },
    preloadedState: initialState,
  });
};

describe('ErrorDisplay', () => {
  test('renders without crashing', () => {
    const store = createStore({ error: { error: null } });
    render(
      <Provider store={store}>
        <ErrorDisplay />
      </Provider>
    );
    expect(screen.queryByTestId('error-alert')).not.toBeInTheDocument();
  });

  test('displays error message when error is present in state', () => {
    const store = createStore(initialState);
    render(
      <Provider store={store}>
        <ErrorDisplay />
      </Provider>
    );
    screen.debug(); // This will output the DOM tree for debugging purposes
    expect(screen.getByTestId('error-alert')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  test('clears error message after 3 seconds', () => {
    jest.useFakeTimers();
    const store = createStore(initialState);
    render(
      <Provider store={store}>
        <ErrorDisplay />
      </Provider>
    );
    screen.debug(); // This will output the DOM tree for debugging purposes
    expect(screen.getByTestId('error-alert')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(store.getState().error.error).toBeUndefined();
    expect(screen.queryByTestId('error-alert')).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});

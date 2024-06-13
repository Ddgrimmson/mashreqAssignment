import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from '../../store/loaderSlice';
import { RootState } from '../../store/store';
import Loader from '../Loader';

// Mocked initial state for loader
const initialState = {
  loader: {
    loader: false
  }
};

// Create a custom store for testing
const createStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      loader: loaderReducer
    },
    preloadedState: initialState,
  });
};

describe('Loader', () => {
  test('renders without crashing', () => {
    const store = createStore(initialState);
    render(
      <Provider store={store}>
        <Loader />
      </Provider>
    );
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  test('displays loader when loader state is true', () => {
    const store = createStore({ loader: { loader: true } });
    render(
      <Provider store={store}>
        <Loader />
      </Provider>
    );
    expect(screen.getByRole('progressbar', {hidden: true})).toBeInTheDocument();
  });

  test('hides loader when loader state is false', () => {
    const store = createStore({ loader: { loader: false } });
    render(
      <Provider store={store}>
        <Loader />
      </Provider>
    );
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});

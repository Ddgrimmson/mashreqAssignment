import React from 'react';
import { render } from '@testing-library/react-native';
import Loader from '../Loader';

describe('Loader Component', () => {
  it('renders ActivityIndicator when visible is true', () => {
    const { getByTestId } = render(<Loader visible={true} />);
    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });

  it('does not render ActivityIndicator when visible is false', () => {
    const { queryByTestId } = render(<Loader visible={false} />);
    const activityIndicator = queryByTestId('activity-indicator');
    expect(activityIndicator).toBeNull();
  });
});

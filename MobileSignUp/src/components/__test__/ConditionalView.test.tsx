import React from 'react';
import { render } from '@testing-library/react-native';
import ConditionalView from '../ConditionalView';
import { Text } from 'react-native';

describe('ConditionalView Component', () => {
  it('renders children when condition is true', () => {
    const { getByText } = render(
      <ConditionalView condition={true}>
        <Text>Visible Content</Text>
      </ConditionalView>
    );

    expect(getByText('Visible Content')).toBeTruthy();
  });

  it('does not render children when condition is false', () => {
    const { queryByText } = render(
      <ConditionalView condition={false}>
        <Text>Invisible Content</Text>
      </ConditionalView>
    );

    expect(queryByText('Invisible Content')).toBeNull();
  });
});

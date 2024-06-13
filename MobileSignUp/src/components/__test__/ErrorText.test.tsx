import React from 'react';
import { render } from '@testing-library/react-native';
import 'jest-styled-components';
import ErrorText from '../ErrorText';

describe('ErrorText Component', () => {
  it('renders correctly with correct styles', () => {
    const { getByText } = render(<ErrorText>Error message</ErrorText>);

    const errorTextComponent = getByText('Error message');
    
    expect(errorTextComponent).toBeTruthy();
  });
});

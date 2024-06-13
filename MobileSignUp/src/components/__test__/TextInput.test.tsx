import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextInput from '../TextInput';
import 'jest-styled-components';

describe('TextInput Component', () => {
  it('renders correctly without error', () => {
    const { getByLabelText, queryByText } = render(
      <TextInput
        label="Username"
        variant="flat"
        value=""
        error={null}
        onChange={() => {}}
      />
    );

    expect(getByLabelText('Username')).toBeTruthy();
    expect(queryByText('Error message')).toBeNull();
  });

  it('displays an error message when error is passed', () => {
    const { getByText } = render(
      <TextInput
        label="Username"
        variant="flat"
        value=""
        error="Error message"
        onChange={() => {}}
      />
    );

    expect(getByText('Error message')).toBeTruthy();
  });

  it('calls the onChange handler when input value changes', async () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <TextInput
        label="Username"
        variant="flat"
        value=""
        error={null}
        onChange={handleChange}
      />
    );
    await fireEvent(getByLabelText('Username'), 'change', 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies secureTextEntry correctly', () => {
    const { getByLabelText } = render(
      <TextInput
        label="Password"
        variant="flat"
        value=""
        error={null}
        secureTextEntry={true}
        onChange={() => {}}
      />
    );

    expect(getByLabelText('Password').props.secureTextEntry).toBe(true);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Drawer from '../Drawer';

describe('Drawer Component', () => {
  it('renders drawer when visible is true', () => {
    const { getByTestId } = render(<Drawer visible={true} />);
    const drawer = getByTestId('drawer-container');
    expect(drawer).toBeTruthy();
  });

  it('does not render drawer when visible is false', () => {
    const { queryByTestId } = render(<Drawer visible={false} />);
    const drawer = queryByTestId('drawer-container');
    expect(drawer).toBeNull();
  });

  it('calls onBackdropClick when backdrop is pressed', () => {
    const mockOnBackdropClick = jest.fn();
    const { getByTestId } = render(
      <Drawer visible={true} onBackdropClick={mockOnBackdropClick} />
    );
    const backdrop = getByTestId('drawer-backdrop');
    fireEvent.press(backdrop);
    expect(mockOnBackdropClick).toHaveBeenCalledTimes(1);
  });
});

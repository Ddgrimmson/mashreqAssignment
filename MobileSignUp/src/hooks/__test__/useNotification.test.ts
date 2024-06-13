
import { renderHook } from '@testing-library/react-hooks';
import { Alert } from 'react-native';
import useNotification from '../useNotification';

jest.mock('../../services/GCMServices', () => ({
  fcmService: {
    register: jest.fn(),
    deleteToken: jest.fn(),
  },
}));

describe('useNotification', () => {
  const { fcmService } = require('../../services/GCMServices');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register FCMService on mount', () => {
    renderHook(() => useNotification());

    expect(fcmService.register).toHaveBeenCalled();
    expect(fcmService.register).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    );
  });

  it('should delete FCM token on unmount', () => {
    const { unmount } = renderHook(() => useNotification());

    unmount();

    expect(fcmService.deleteToken).toHaveBeenCalled();
  });
});

import { renderHook, act } from '@testing-library/react-hooks';
import useFirebaseAuth from '../useFirebaseAuth'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../../store/userSlice';
import { clearLoader, setLoader } from '../../store/loaderSlice';
import { setError } from '../../store/errorSlice';

// Mock firebase functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({
    signOut: jest.fn() // Ensure signOut is defined here
  }))
}));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getFirestore: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

describe('useFirebaseAuth', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('signIn successfully', async () => {
    const userInfo = { email: 'test@example.com', username: 'testuser', country: 'india' };
    const userDoc = { docs: [{ data: () => userInfo }] };
    
    (getDocs as jest.Mock).mockResolvedValueOnce(userDoc);
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useFirebaseAuth());

    await act(async () => {
      await result.current.signIn('testuser', 'password123', 'india');
    });

    expect(mockDispatch).toHaveBeenCalledWith(setLoader());
    expect(getDocs).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, userInfo.email, 'password123');
    expect(mockDispatch).toHaveBeenCalledWith(setUser(userInfo));
    expect(mockDispatch).toHaveBeenCalledWith(clearLoader());
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  test('signIn failure', async () => {
    const error = new Error('Invalid Username password or country');
    (getDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });

    const { result } = renderHook(() => useFirebaseAuth());

    let signInError;
    await act(async () => {
      signInError = await result.current.signIn('testuser', 'password123', 'india');
    });

    expect(mockDispatch).toHaveBeenCalledWith(setLoader());
    expect(getDocs).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(clearLoader());
    expect(mockDispatch).toHaveBeenCalledWith(setError(error));
    expect(signInError).toStrictEqual(error);
  });

  test('logout successfully', async () => {
    const signOutMock = jest.fn();
    (auth as any).signOut = signOutMock;

    const { result } = renderHook(() => useFirebaseAuth());

    await act(async () => {
      result.current.logout();
    });

    expect(mockDispatch).toHaveBeenCalledWith(setLoader());
    expect(signOutMock).toHaveBeenCalled(); // Check if signOut is called
    expect(mockDispatch).toHaveBeenCalledWith(clearUser());
    expect(mockDispatch).toHaveBeenCalledWith(clearLoader());
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

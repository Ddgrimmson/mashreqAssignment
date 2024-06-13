import { createSlice } from '@reduxjs/toolkit';

const initialState: {
    error: Error | undefined
} = {
    error: undefined
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
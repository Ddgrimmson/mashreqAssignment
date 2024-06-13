import { createSlice } from '@reduxjs/toolkit';

const initialState: {
    loader: boolean
} = {
    loader: false
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state) => {
      state.loader = true;
    },
    clearLoader: (state) => {
      state.loader = false;
    },
  },
});

export const { setLoader, clearLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
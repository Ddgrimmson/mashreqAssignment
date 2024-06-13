import { createSlice } from "@reduxjs/toolkit";

interface UserInformation {
  username: string;
  email: string;
  country: string;
}

const initialState: {
  userInfo: UserInformation | null;
} = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

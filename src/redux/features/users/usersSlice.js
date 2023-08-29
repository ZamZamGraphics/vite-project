import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAvatar: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserAvatar: (state, action) => {
      state.userAvatar = action.payload;
    },
    removeUserAvatar: (state) => {
      state.userAvatar = {};
    },
  },
});

export const { setUserAvatar, removeUserAvatar } = usersSlice.actions;
export default usersSlice.reducer;

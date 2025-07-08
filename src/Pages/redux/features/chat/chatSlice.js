import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    typing: false,
  },
  reducers: {
    setTyping: (state, action) => {
      state.typing = action.payload;
    },
  },
});

export const { setTyping } = chatSlice.actions;
export default chatSlice.reducer;

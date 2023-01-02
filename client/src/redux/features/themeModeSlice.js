import { light } from "@mui/material/styles/createPalette";
import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "ThemeMode",
  initialState: {
    themeMode: window.localStorage.getItem("themeMode") || "dark"
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      window.localStorage.setItem("themeMode", action.payload );
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:  null,
  navOpen: false,
  ref:null,
  isLoggedIn: false
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
   setUser: (state, action)=> {
    const value = action.payload;
    // saveToken(value);
    state.user = value;
   },
   setLoggedIn: (state, action)=> {
    const value = action.payload;
    state.isLoggedIn = value;
   },
   setRef: (state, action)=> {
    const value = action.payload;
    state.ref = value;
   },
   setNavOpen: (state, action)=> {
    const value = action.payload;
    state.navOpen = value;
   }
  },
});
